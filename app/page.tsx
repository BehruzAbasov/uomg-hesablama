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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-950 transition-colors duration-300">
      {/* Header Section */}
      <div className="border-b border-slate-200/50 bg-white/50 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/50">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 p-3 shadow-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                ATU ÜOMG Sistemi
              </h1>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
                Tələbə akademik məlumatlarını təhlükəsiz şəkildə daxil edin
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-140px)] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg">
          <Card variant="default">
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Group Selection */}
              <div className="space-y-3">
                <h2 className="section-title">
                  Əsas Məlumatlar
                </h2>
                <div className="space-y-4 pt-1">
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

              {/* Divider */}
              <div className="border-t border-slate-200/50 dark:border-slate-800/50" />

              {/* GPA Section */}
              <div className="space-y-3">
                <h2 className="section-title">
                  ÜOMG Məlumatı
                </h2>
                <div className="pt-1">
                  <GPAInput
                    value={gpa}
                    onChange={(value) => {
                      clearMessages();
                      setGpa(value);
                    }}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Messages */}
              {(error || message) && (
                <div className="space-y-2 animate-slide-up">
                  {error && <ErrorAlert message={error} />}
                  {message && <SuccessAlert message={message} />}
                </div>
              )}

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
          <div className="mt-8 animate-fade-in rounded-xl border border-slate-200/60 bg-white/50 px-5 py-4 backdrop-blur-sm dark:border-slate-800/60 dark:bg-slate-950/50">
            <p className="text-center text-xs text-slate-600 dark:text-slate-400">
              Bütün məlumatlar əmin bir şəkildə Supabase verilənlər bazasında saxlanılır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
