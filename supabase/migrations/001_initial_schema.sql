-- Миграция 001: Инициализация схемы базы данных для GdeMaks
-- Создание всех таблиц, индексов и политик безопасности

-- Включение расширений
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Таблица профилей пользователей (расширяет auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'foreman', 'master', 'client')),
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Таблица строительных объектов
CREATE TABLE IF NOT EXISTS public.construction_objects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_phone TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  status TEXT NOT NULL CHECK (status IN ('planning', 'active', 'paused', 'completed')),
  template TEXT CHECK (template IN ('apartment', 'cottage', 'office', 'custom')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- Таблица модулей
CREATE TABLE IF NOT EXISTS public.modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  version TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  icon TEXT NOT NULL,
  component_code TEXT,
  installed BOOLEAN DEFAULT FALSE,
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- Таблица позиций прайса
CREATE TABLE IF NOT EXISTS public.price_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  unit TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('work', 'material')),
  category TEXT NOT NULL,
  supplier TEXT,
  sku TEXT,
  module_id UUID REFERENCES public.modules(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Таблица задач модулей
CREATE TABLE IF NOT EXISTS public.module_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  duration INTEGER NOT NULL CHECK (duration >= 0),
  depends_on TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Таблица позиций сметы
CREATE TABLE IF NOT EXISTS public.estimate_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  object_id UUID NOT NULL REFERENCES public.construction_objects(id) ON DELETE CASCADE,
  price_item_id UUID NOT NULL REFERENCES public.price_items(id) ON DELETE CASCADE,
  quantity DECIMAL(10,3) NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
  total DECIMAL(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'ordered', 'delivered', 'installed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Таблица задач (работ)
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  object_id UUID NOT NULL REFERENCES public.construction_objects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed', 'overdue')),
  assignee_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  depends_on UUID[] DEFAULT '{}',
  photos TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (end_date >= start_date)
);

-- Таблица чеклиста задач
CREATE TABLE IF NOT EXISTS public.task_checklist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Таблица склада
CREATE TABLE IF NOT EXISTS public.warehouse_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  unit TEXT NOT NULL,
  quantity DECIMAL(10,3) NOT NULL DEFAULT 0 CHECK (quantity >= 0),
  min_quantity DECIMAL(10,3) NOT NULL DEFAULT 0 CHECK (min_quantity >= 0),
  supplier TEXT,
  last_purchase_price DECIMAL(10,2),
  location TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Таблица транзакций склада
CREATE TABLE IF NOT EXISTS public.warehouse_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('incoming', 'outgoing')),
  item_id UUID NOT NULL REFERENCES public.warehouse_items(id) ON DELETE CASCADE,
  quantity DECIMAL(10,3) NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
  total DECIMAL(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  date DATE DEFAULT CURRENT_DATE,
  object_id UUID REFERENCES public.construction_objects(id) ON DELETE SET NULL,
  task_id UUID REFERENCES public.tasks(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Таблица актов выполненных работ
CREATE TABLE IF NOT EXISTS public.acts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  object_id UUID NOT NULL REFERENCES public.construction_objects(id) ON DELETE CASCADE,
  number TEXT UNIQUE NOT NULL,
  date DATE NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
  signature TEXT,
  signed_by_client BOOLEAN DEFAULT FALSE,
  sent_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (period_end >= period_start)
);

-- Таблица сообщений чата
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  object_id UUID NOT NULL REFERENCES public.construction_objects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  attachments TEXT[] DEFAULT '{}',
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  read_by UUID[] DEFAULT '{}',
  mentions UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Таблица комментариев
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('task', 'estimate', 'act')),
  entity_id UUID NOT NULL,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Таблицы связей многие-ко-многим

-- Связь объектов и модулей
CREATE TABLE IF NOT EXISTS public.object_modules (
  object_id UUID NOT NULL REFERENCES public.construction_objects(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (object_id, module_id)
);

-- Связь объектов и пользователей
CREATE TABLE IF NOT EXISTS public.object_users (
  object_id UUID NOT NULL REFERENCES public.construction_objects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('viewer', 'editor', 'manager')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (object_id, user_id)
);

-- Связь актов и задач
CREATE TABLE IF NOT EXISTS public.act_tasks (
  act_id UUID NOT NULL REFERENCES public.acts(id) ON DELETE CASCADE,
  task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (act_id, task_id)
);

-- Индексы для улучшения производительности

-- Индексы для construction_objects
CREATE INDEX IF NOT EXISTS idx_construction_objects_status ON public.construction_objects(status);
CREATE INDEX IF NOT EXISTS idx_construction_objects_created_by ON public.construction_objects(created_by);
CREATE INDEX IF NOT EXISTS idx_construction_objects_dates ON public.construction_objects(start_date, end_date);

-- Индексы для tasks
CREATE INDEX IF NOT EXISTS idx_tasks_object_id ON public.tasks(object_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_assignee_id ON public.tasks(assignee_id);
CREATE INDEX IF NOT EXISTS idx_tasks_dates ON public.tasks(start_date, end_date);

-- Индексы для estimate_items
CREATE INDEX IF NOT EXISTS idx_estimate_items_object_id ON public.estimate_items(object_id);
CREATE INDEX IF NOT EXISTS idx_estimate_items_status ON public.estimate_items(status);

-- Индексы для warehouse_items
CREATE INDEX IF NOT EXISTS idx_warehouse_items_sku ON public.warehouse_items(sku);
CREATE INDEX IF NOT EXISTS idx_warehouse_items_location ON public.warehouse_items(location);
CREATE INDEX IF NOT EXISTS idx_warehouse_items_quantity ON public.warehouse_items(quantity) WHERE quantity < min_quantity;

-- Индексы для chat_messages
CREATE INDEX IF NOT EXISTS idx_chat_messages_object_id ON public.chat_messages(object_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_timestamp ON public.chat_messages(timestamp);

-- Индексы для полнотекстового поиска
CREATE INDEX IF NOT EXISTS idx_profiles_name ON public.profiles USING gin(to_tsvector('russian', name));
CREATE INDEX IF NOT EXISTS idx_construction_objects_name ON public.construction_objects USING gin(to_tsvector('russian', name));
CREATE INDEX IF NOT EXISTS idx_tasks_title ON public.tasks USING gin(to_tsvector('russian', title));

-- Триггеры для обновления updated_at

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Применение триггеров к таблицам с updated_at
DO $$ 
DECLARE 
  tbl text;
BEGIN 
  FOR tbl IN 
    SELECT table_name 
    FROM information_schema.columns 
    WHERE column_name = 'updated_at' 
      AND table_schema = 'public'
  LOOP
    EXECUTE format('
      DROP TRIGGER IF EXISTS update_%s_updated_at ON public.%I;
      CREATE TRIGGER update_%s_updated_at
      BEFORE UPDATE ON public.%I
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    ', tbl, tbl, tbl, tbl);
  END LOOP;
END $$;

-- Функции

-- Функция для генерации номера акта
CREATE OR REPLACE FUNCTION public.generate_act_number()
RETURNS TEXT AS $$
DECLARE
  year_part TEXT;
  month_part TEXT;
  seq_num INTEGER;
  act_number TEXT;
BEGIN
  year_part := EXTRACT(YEAR FROM CURRENT_DATE)::TEXT;
  month_part := LPAD(EXTRACT(MONTH FROM CURRENT_DATE)::TEXT, 2, '0');
  
  -- Получаем следующий порядковый номер для текущего месяца
  SELECT COALESCE(MAX(CAST(SUBSTRING(number FROM 10) AS INTEGER)), 0) + 1
  INTO seq_num
  FROM public.acts
  WHERE number LIKE 'ACT-' || year_part || month_part || '-%';
  
  act_number := 'ACT-' || year_part || month_part || '-' || LPAD(seq_num::TEXT, 4, '0');
  RETURN act_number;
END;
$$ LANGUAGE plpgsql;

-- Функция для проверки доступности материала
CREATE OR REPLACE FUNCTION public.can_consume_material(item_id UUID, quantity DECIMAL)
RETURNS BOOLEAN AS $$
DECLARE
  available DECIMAL;
BEGIN
  SELECT COALESCE(wi.quantity, 0)
  INTO available
  FROM public.warehouse_items wi
  WHERE wi.id = item_id;
  
  RETURN available >= quantity;
END;
$$ LANGUAGE plpgsql;

-- Функция для получения просроченных задач
CREATE OR REPLACE FUNCTION public.get_overdue_tasks(user_id UUID)
RETURNS TABLE (
  id UUID,
  title TEXT,
  object_id UUID,
  end_date DATE,
  days_overdue INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.id,
    t.title,
    t.object_id,
    t.end_date,
    EXTRACT(DAY FROM (CURRENT_DATE - t.end_date))::INTEGER as days_overdue
  FROM public.tasks t
  LEFT JOIN public.object_users ou ON t.object_id = ou.object_id
  WHERE t.status != 'completed'
    AND t.end_date < CURRENT_DATE
    AND (t.assignee_id = user_id OR ou.user_id = user_id OR t.object_id IN (
      SELECT object_id FROM public.construction_objects WHERE created_by = user_id
    ))
  ORDER BY t.end_date ASC;
END;
$$ LANGUAGE plpgsql;

-- Комментарии к таблицам
COMMENT ON TABLE public.profiles IS 'Профили пользователей системы';
COMMENT ON TABLE public.construction_objects IS 'Строительные объекты (проекты)';
COMMENT ON TABLE public.modules IS 'Модули системы (плагины)';
COMMENT ON TABLE public.price_items IS 'Позиции прайс-листа';
COMMENT ON TABLE public.estimate_items IS 'Позиции сметы по объектам';
COMMENT ON TABLE public.tasks IS 'Задачи (работы) по объектам';
COMMENT ON TABLE public.warehouse_items IS 'Материалы на складе';
COMMENT ON TABLE public.acts IS 'Акты выполненных работ';
COMMENT ON TABLE public.chat_messages IS 'Сообщения в чате объектов';