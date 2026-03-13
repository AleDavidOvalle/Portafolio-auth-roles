import prisma from "../config/prisma.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({
      message: "Dashboard data",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo dashboard",
      error: error.message,
    });
  }
};