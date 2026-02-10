import { prisma } from "../../../../../lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({
        where: { email },
    })

    if (!user) {
        return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
        )
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
        return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
        )
    }

    return NextResponse.json({ success: true })
}
