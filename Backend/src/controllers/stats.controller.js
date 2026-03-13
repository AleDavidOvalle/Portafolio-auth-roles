import prisma from "../config/prisma.js";

export const usersByRole = async (req, res) => {
  try {
    const result = await prisma.user.groupBy({
      by: ["role"],
      _count: {
        id: true,
      },
    });

    res.json(result.map(item => ({ role: item.role, total: item._count.id })));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error obteniendo estadísticas",
    });
  }
};

export const usersByDate = async (req, res) => {
  try {
    const result = await prisma.user.findMany({
      select: {
        createdAt: true,
      },
    });

    const grouped = result.reduce((acc, user) => {
      const date = user.createdAt.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const sorted = Object.entries(grouped)
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => a.date.localeCompare(b.date));

    res.json(sorted);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error obteniendo estadísticas",
    });
  }
};