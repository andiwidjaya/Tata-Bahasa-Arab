import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gamepad2, Swords, Zap, Blocks } from "lucide-react";

export default function GamesPage() {
  const games = [
    {
      id: 'irab-battle',
      title: 'I\'rab Battle',
      description: 'Tanding cepat menentukan harakat & kedudukan kata dalam waktu terbatas.',
      icon: Swords,
      color: 'bg-red-500',
      badge: 'Multiplayer / PvP',
    },
    {
      id: 'tashrif-race',
      title: 'Tashrif Race',
      description: 'Adu kecepatan mencocokkan wazan Tashrif Fi\'il Madhi ke Fi\'il Mudhari.',
      icon: Zap,
      color: 'bg-amber-500',
      badge: 'Time Attack',
    },
    {
      id: 'word-builder',
      title: 'Word Builder',
      description: 'Rangkai potongan huruf dan harakat menjadi kalimat Arab yang sah secara Nahwu.',
      icon: Blocks,
      color: 'bg-blue-500',
      badge: 'Puzzle',
    },
  ];

  return (
    <PageContainer
      title="Game Edukasi Bahasa Arab"
      description="Asah kelancaran Nahwu & Shorof melalui permainan yang seru dan menantang."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {games.map((g) => {
          const Icon = g.icon;
          return (
            <Card key={g.id} className="flex flex-col justify-between hover:shadow-xl transition border-slate-200 dark:border-slate-800">
              <CardHeader>
                <div className="flex justify-between items-center mb-3">
                  <div className={`w-12 h-12 rounded-2xl ${g.color} text-white flex items-center justify-center shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant="outline">{g.badge}</Badge>
                </div>
                <CardTitle className="text-xl font-bold">{g.title}</CardTitle>
                <CardDescription>{g.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/games/${g.id}`}>
                  <Button className="w-full">
                    <span>Mainkan Sekarang ⚡</span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}
