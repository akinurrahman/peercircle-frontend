"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import WaveOverlay from "@/assets/overlays/waveOverlay";
import { APP_NAME } from "@/constants/common.constants";
import { imageConstant } from "@/constants/images.constants";
import LogInForm from "./login-form";
import SignUpForm from "./signup-form";

export default function Component() {
  const [activeTab, setActiveTab] = useState("login");
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setActiveTab(pathname.includes("signup") ? "signup" : "login");
  }, [pathname]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.replace(value === "signup" ? "/signup" : "/login");
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex min-h-screen bg-gray-100 p-4 dark:bg-inherit sm:p-6 md:p-8">
      <div className="mx-auto flex w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-[#020817]">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#2842ea] to-[#d62ef5] dark:bg-gradient-to-br dark:from-[#1a1a2e] dark:to-[#16213e] lg:flex lg:w-1/2 xl:w-3/5">
          <WaveOverlay />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 0.5 }}
              className="relative z-10 flex h-full flex-col justify-center p-12 text-white"
            >
              {activeTab === "login" ? (
                <>
                  <motion.h2
                    variants={textVariants}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-6 text-4xl font-bold"
                  >
                    Welcome Back to {APP_NAME}
                  </motion.h2>
                  <motion.p
                    variants={textVariants}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-8 text-xl text-blue-100"
                  >
                    Your academic marketplace awaits. Log in to connect with
                    peers, exchange resources, and elevate your learning
                    experience.
                  </motion.p>
                  <ul className="space-y-4">
                    {[
                      "Access your personalized dashboard",
                      "Connect with study groups and classmates",
                      "Browse the latest academic offerings",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        variants={textVariants}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        className="flex items-center"
                      >
                        <ArrowRight className="mr-2 size-5 text-blue-300" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <motion.h2
                    variants={textVariants}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-6 text-4xl font-bold"
                  >
                    Join the {APP_NAME} Community
                  </motion.h2>
                  <motion.p
                    variants={textVariants}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-8 text-xl text-blue-100"
                  >
                    Create an account to unlock a world of academic
                    opportunities. Connect, share, and thrive with fellow
                    students.
                  </motion.p>
                  <ul className="space-y-4">
                    {[
                      "Create your student profile",
                      "List and discover academic resources",
                      "Join subject-specific study groups",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        variants={textVariants}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        className="flex items-center"
                      >
                        <ArrowRight className="mr-2 size-5 text-blue-300" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex w-full justify-center p-4 lg:w-1/2 xl:w-2/5">
          <Card className="w-full max-w-md border-none shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center justify-center text-center text-3xl font-bold text-gray-800 dark:text-inherit">
                <Image
                  src={isDark ? imageConstant.darkModeLogo : imageConstant.logo}
                  width={200}
                  height={60}
                  alt="logo"
                />
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Your Academic Marketplace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={handleTabChange}
                className="w-full"
              >
                <TabsList className="mb-8 grid h-12 w-full grid-cols-2">
                  <TabsTrigger value="login" className="py-2.5">
                    Login
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="py-2.5">
                    Sign Up
                  </TabsTrigger>
                </TabsList>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TabsContent value="login">
                      <LogInForm />
                    </TabsContent>
                    <TabsContent value="signup">
                      <SignUpForm />
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </Tabs>
            </CardContent>
            <CardFooter className="text-center text-sm text-gray-600">
              By continuing, you agree to our Terms of Service and Privacy
              Policy.
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
