"use client";

import { useEffect, useState } from "react";

import Card from "@/components/Card";
import GroupSelect from "@/components/GroupSelect";
import StudentSelect from "@/components/StudentSelect";
import GPAInput from "@/components/GPAInput";
import SubmitButton from "@/components/SubmitButton";

import { supabase } from "@/lib/supabase";

import { Student } from "@/types/student";

export default function Home() {
  const [groups, setGroups] = useState<string[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [gpa, setGpa] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function clearMessages() {
    setMessage("");
    setError("");
  }

  useEffect(() => {
    async function loadGroups() {
      setLoadingGroups(true);

      const { data, error } = await supabase
        .from("students")
        .select("group_id");

      if (error) {
        setError("Qruplar yüklənərkən xəta baş verdi.");
        setLoadingGroups(false);
        return;
      }

      const uniqueGroups = [
        ...new Set(data.map((item) => item.group_id)),
      ];

      uniqueGroups.sort();

      setGroups(uniqueGroups);
      setLoadingGroups(false);
    }

    loadGroups();
  }, []);

  useEffect(() => {
    if (!selectedGroup) {
      setStudents([]);
      setSelectedStudent("");
      return;
    }

    async function loadStudents() {
      setLoadingStudents(true);

      const { data, error } = await supabase
        .from("students")
        .select("id,student_code,fullname,group_id")
        .eq("group_id", selectedGroup)
        .order("fullname");

      if (error) {
        setError("Tələbələr yüklənə bilmədi.");
        setLoadingStudents(false);
        return;
      }

      setStudents(data);
      setLoadingStudents(false);
    }

    loadStudents();
  }, [selectedGroup]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    clearMessages();

    if (!selectedGroup) {
      setError("Qrup seçin.");
      return;
    }

    if (!selectedStudent) {
      setError("Tələbə seçin.");
      return;
    }

    if (!gpa.trim()) {
      setError("ÜOMG daxil edin.");
      return;
    }

    const gpaNumber = Number(gpa.replace(",", "."));

    if (Number.isNaN(gpaNumber)) {
      setError("ÜOMG düzgün formatda deyil.");
      return;
    }

    if (gpaNumber < 0 || gpaNumber > 100) {
      setError("ÜOMG 0 ilə 100 arasında olmalıdır.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: selectedStudent,
          groupId: selectedGroup,
          gpa: gpaNumber,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Xəta baş verdi.");
      }

      setMessage(result.message);
      setSelectedGroup("");
      setSelectedStudent("");
      setStudents([]);
      setGpa("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Naməlum xəta baş verdi.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <Card
        title="ATU ÜOMG Sistemi"
        subtitle="Qrupunuzu seçin, adınızı seçin və ÜOMG-ni daxil edin."
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <GroupSelect
            groups={groups}
            value={selectedGroup}
            onChange={(value) => {
              clearMessages();
              setSelectedGroup(value);
            }}
            disabled={loading || loadingGroups}
          />

          <StudentSelect
            students={students}
            value={selectedStudent}
            onChange={(value) => {
              clearMessages();
              setSelectedStudent(value);
            }}
            disabled={
              loading || loadingStudents || !selectedGroup
            }
          />

          <GPAInput
            value={gpa}
            onChange={(value) => {
              clearMessages();
              setGpa(value);
            }}
            disabled={loading}
          />

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              {message}
            </div>
          )}

          <SubmitButton
            loading={loading}
            disabled={
              loading ||
              loadingGroups ||
              loadingStudents ||
              !selectedGroup ||
              !selectedStudent ||
              !gpa
            }
          />
        </form>
      </Card>
    </main>
  );
}
