-- =====================================================
-- ATU GPA SYSTEM
-- PostgreSQL / Supabase
-- =====================================================

-- UUID extension
create extension if not exists "pgcrypto";

-- =====================================================
-- STUDENTS
-- =====================================================

create table if not exists students (

    id uuid primary key default gen_random_uuid(),

    student_code text unique not null,

    fullname text not null,

    group_id text not null,

    created_at timestamptz default now()

);

create index idx_students_group
on students(group_id);

create index idx_students_name
on students(fullname);

-- =====================================================
-- SUBMISSIONS
-- =====================================================

create table if not exists submissions (

    id uuid primary key default gen_random_uuid(),

    student_id uuid not null
        references students(id)
        on delete cascade,

    gpa numeric(5,2) not null
        check (gpa >= 0 and gpa <= 100),

    created_at timestamptz default now(),

    updated_at timestamptz default now(),

    constraint unique_submission
        unique(student_id)

);

create index idx_submission_student
on submissions(student_id);

-- =====================================================
-- Updated At Trigger
-- =====================================================

create or replace function update_timestamp()
returns trigger
language plpgsql
as
$$
begin

new.updated_at = now();

return new;

end;
$$;

drop trigger if exists trg_update_submission
on submissions;

create trigger trg_update_submission

before update

on submissions

for each row

execute procedure update_timestamp();

-- =====================================================
-- RLS
-- =====================================================

alter table students
enable row level security;

alter table submissions
enable row level security;

-- =====================================================
-- STUDENTS
-- Everyone can read
-- =====================================================

create policy "students_select"

on students

for select

using (true);

-- =====================================================
-- SUBMISSIONS
-- Read
-- =====================================================

create policy "submission_select"

on submissions

for select

using (true);

-- =====================================================
-- INSERT
-- =====================================================

create policy "submission_insert"

on submissions

for insert

with check (true);

-- =====================================================
-- UPDATE
-- =====================================================

create policy "submission_update"

on submissions

for update

using (true);

-- =====================================================
-- DELETE
-- =====================================================

create policy "submission_delete"

on submissions

for delete

using (true);