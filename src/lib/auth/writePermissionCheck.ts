import { headers } from "next/headers";
import { auth } from "./auth";
import { NextResponse } from "next/server";
import { UserRole } from "@/models/UserRole";

export const writePermissionCheck = async (): Promise<NextResponse | null> => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
    if (session.user.role === UserRole.GUEST) {
        return NextResponse.json(
            { error: 'Forbidden: You do not have permission to create a project' },
            { status: 403 }
        );
    }
    return null
}