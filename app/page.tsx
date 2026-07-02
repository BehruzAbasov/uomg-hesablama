"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { GraduationCap } from "lucide-react";

import Card from "@/components/Card";
import GroupSelect from "@/components/GroupSelect";
import StudentSelect from "@/components/StudentSelect";
import GPAInput from "@/components/GPAInput";
import SubmitButton from "@/components/SubmitButton";
import SuccessAlert from "@/components/SuccessAlert";
import ErrorAlert from "@/components/ErrorAlert";

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

      const uniqueGroups = [...new Set(data.map((item) => item.group_id))];
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      {/* Header Section */}
      <div className="border-b border-slate-200 bg-white/40 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/40">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 p-2.5">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                ATU ÜOMG Sistemi
              </h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Tələbə akademik məlumatlarını təhlükəsiz şəkildə daxil edin
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg">
          <Card variant="default">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Group Selection */}
              <div>
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                  Əsas Məlumatlar
                </h2>
                <div className="space-y-4">
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
                    disabled={loading || loadingStudents || !selectedGroup}
                  />
                </div>
              </div>

              {/* GPA Section */}
              <div>
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                  ÜOMG Məlumatı
                </h2>
                <GPAInput
                  value={gpa}
                  onChange={(value) => {
                    clearMessages();
                    setGpa(value);
                  }}
                  disabled={loading}
                />
              </div>

              {/* Messages */}
              <div className="space-y-3">
                {error && <ErrorAlert message={error} />}
                {message && <SuccessAlert message={message} />}
              </div>

              {/* Submit Button */}
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

          {/* Footer Info */}
          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3 text-center dark:border-slate-800 dark:bg-slate-900/30">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Bütün məlumatlar əmin bir şəkildə Supabase verilənlər bazasında saxlanılır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
