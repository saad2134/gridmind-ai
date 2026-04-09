'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Building2,
  Zap,
  Home,
  Users,
  ArrowRight,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface Role {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  href: string;
}

const roles: Role[] = [
  {
    id: 'executive',
    name: 'Energy Executive',
    description: 'Executive-level analytics, strategic insights, and high-level grid performance metrics',
    icon: <Building2 className="w-8 h-8" />,
    color: 'bg-purple-500',
    href: '/executive/dashboard',
  },
  {
    id: 'operator',
    name: 'Grid Operator',
    description: 'Real-time grid monitoring, AI decisions, and operational control center',
    icon: <Zap className="w-8 h-8" />,
    color: 'bg-blue-500',
    href: '/operator/dashboard',
  },
  {
    id: 'consumer',
    name: 'Consumer',
    description: 'Personal energy usage tracking, consumption analytics, and billing management',
    icon: <Home className="w-8 h-8" />,
    color: 'bg-green-500',
    href: '/consumer/dashboard',
  },
  {
    id: 'regulator',
    name: 'Regulator',
    description: 'Compliance monitoring, grid reliability metrics, and regulatory reporting',
    icon: <Users className="w-8 h-8" />,
    color: 'bg-orange-500',
    href: '/regulator/dashboard',
  },
];

export default function AuthPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
    setIsAnimating(true);
    setTimeout(() => {
      router.push(role.href);
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          className="absolute top-10 left-10 w-[200px] h-[200px] rounded-full bg-primary/20 blur-[80px] dark:bg-primary/10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-[180px] h-[180px] rounded-full bg-secondary/20 blur-[70px] dark:bg-secondary/10"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Choose Your Role
            </h1>
            <p className="text-muted-foreground text-lg">
              Select a role to access your personalized dashboard
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/50 bg-card/80 dark:bg-card/90 ${
                  selectedRole?.id === role.id
                    ? 'ring-2 ring-primary border-primary'
                    : ''
                } ${isAnimating && selectedRole?.id === role.id ? 'scale-95 opacity-50' : ''}`}
                onClick={() => handleSelectRole(role)}
              >
                <CardContent className="p-6 flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${role.color} text-white shrink-0`}>
                    {role.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1">{role.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {role.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button variant="ghost" asChild>
            <a href="/">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Home
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
