import { supabaseAdmin } from "@/lib/supabase-admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { studentId, groupId, gpa } = body;

    // ==========================
    // Validation
    // ==========================

    if (!studentId || !groupId || gpa === undefined) {
      return NextResponse.json(
        {
          success: false,
          message: "Bütün məlumatları daxil edin.",
        },
        {
          status: 400,
        }
      );
    }

    if (typeof gpa !== "number") {
      return NextResponse.json(
        {
          success: false,
          message: "ÜOMG düzgün deyil.",
        },
        {
          status: 400,
        }
      );
    }

    if (gpa < 0 || gpa > 100) {
      return NextResponse.json(
        {
          success: false,
          message: "ÜOMG 0-100 arasında olmalıdır.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================
    // Student exists?
    // ==========================

    const { data: student, error: studentError } =
      await supabaseAdmin
        .from("students")
        .select("id, group_id")
        .eq("id", studentId)
        .single();

    if (studentError || !student) {
      return NextResponse.json(
        {
          success: false,
          message: "Tələbə tapılmadı.",
        },
        {
          status: 404,
        }
      );
    }

    if (student.group_id !== groupId) {
      return NextResponse.json(
        {
          success: false,
          message: "Qrup uyğun deyil.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================
    // Already submitted?
    // ==========================

    const { data: submission } =
      await supabaseAdmin
        .from("submissions")
        .select("id")
        .eq("student_id", studentId)
        .maybeSingle();

    if (submission) {
      return NextResponse.json(
        {
          success: false,
          message: "Bu tələbə artıq ÜOMG daxil edib.",
        },
        {
          status: 409,
        }
      );
    }

    // ==========================
    // Save GPA
    // ==========================

    const { error: insertError } =
      await supabaseAdmin
        .from("submissions")
        .insert({
          student_id: studentId,
          gpa,
        });

    if (insertError) {
      console.error(insertError);

      return NextResponse.json(
        {
          success: false,
          message: "Məlumat yadda saxlanılmadı.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "ÜOMG uğurla qeydə alındı.",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server xətası.",
      },
      {
        status: 500,
      }
    );
  }
}