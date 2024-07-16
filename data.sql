CREATE TABLE IF NOT EXISTS category (
    id SERIAL PRIMARY KEY,
    name  text UNIQUE NOT NULL,
    time TIMESTAMP DEFAULT NOW() 
);
CREATE TABLE IF NOT EXISTS discount (
    id SERIAL PRIMARY KEY,
    name  text UNIQUE NOT NULL,
    amount numeric(4,3) not null,
    time TIMESTAMP DEFAULT NOW() 
);
CREATE TABLE IF NOT EXISTS type_of_studey (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    time TIMESTAMP DEFAULT NOW() ,
    category_id INTEGER  NOT NULL  REFERENCES category(id),
    amount NUMERIC(10, 2) not null
);
CREATE TABLE IF NOT EXISTS stage (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    time TIMESTAMP DEFAULT NOW() ,
    type_id INTEGER  NOT NULL  REFERENCES type_of_studey(id),
    is_end BOOLEAN DEFAULT false,
    
);

CREATE TABLE IF NOT EXISTS student (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    
    time TIMESTAMP DEFAULT NOW() ,
    stage_id INTEGER  NOT NULL  REFERENCES stage(id),
    discount_id INTEGER  REFERENCES discount(id),
    start_date date Not Null,
    end_date date NOT NUll,
    is_end boolean  DEFAULT false,
    amount NUMERIC(10, 2) not null
);

CREATE TABLE IF NOT EXISTS Receipts (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES student(id)  ,
    amount NUMERIC(10, 2) not null,
    created_at TIMESTAMP DEFAULT NOW() 
);
CREATE TABLE IF NOT EXISTS logs_amount (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES student(id) ,
    amount NUMERIC(10, 2) not null,
    created_at TIMESTAMP DEFAULT NOW(),
    why text NoT Null
);

ALTER TABLE stage
ADD deleted  BOOLEAN DEFAULT false;

ALTER TABLE student
ADD deleted  BOOLEAN DEFAULT false;

ALTER TABLE type_of_studey
ADD deleted  BOOLEAN DEFAULT false;

ALTER TABLE discount
ADD deleted  BOOLEAN DEFAULT false;

ALTER TABLE category
ADD deleted  BOOLEAN DEFAULT false;
