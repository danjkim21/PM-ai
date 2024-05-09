"use client";

import Link from "next/link";
import { AvatarImage, AvatarFallback, Avatar } from "~/components/ui/avatar";
import {
  CardContent,
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  CheckIcon,
  LockIcon,
  MergeIcon,
  MountainIcon,
  PieChartIcon,
  ScalingIcon,
  WorkflowIcon,
} from "~/components/Icons";
import { webLinks } from "~/config/nav";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function HomePage() {
  const { status } = useSession();

  if (status === "authenticated") redirect("/dashboard");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme SaaS</span>
        </Link>
        <nav className="ml-auto flex gap-2 sm:gap-6">
          {webLinks.map((link) => (
            <Button
              key={link.title}
              variant="link"
              asChild
              className="hidden sm:block"
            >
              <Link href={link.href}>{link.title}</Link>
            </Button>
          ))}
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-[1200px] gap-4 px-4 sm:px-6 md:grid-cols-2 md:gap-16 md:px-10">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Streamline Your Business with Acme SaaS
                </h1>
                <p className="mx-auto mt-4 max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Our all-in-one SaaS platform helps you manage your business
                  operations, automate workflows, and drive growth.
                </p>
                <div className="mt-6 flex flex-col space-x-4 sm:flex-row">
                  <Button asChild>
                    <Link href="/api/auth/signin">Sign Up</Link>
                  </Button>

                  <Button variant="secondary" asChild>
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              {/* <Image */}
              {/*   alt="Hero" */}
              {/*   className="mx-auto aspect-[3/2] overflow-hidden rounded-t-xl object-cover md:rounded-l-xl md:rounded-t-none" */}
              {/*   src="/placeholder.svg" */}
              {/*   height="400" */}
              {/*   width="600" */}
              {/* /> */}
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Streamline Your Business Operations
                </h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our SaaS platform offers a comprehensive suite of tools to
                  help you manage your business more efficiently.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <WorkflowIcon className="h-6 w-6 text-gray-900 dark:text-gray-50" />
                  <h3 className="text-lg font-bold">Workflow Automation</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Streamline your business processes and eliminate manual tasks
                  with our powerful workflow automation tools.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <PieChartIcon className="h-6 w-6 text-gray-900 dark:text-gray-50" />
                  <h3 className="text-lg font-bold">Advanced Analytics</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Gain deep insights into your business performance with our
                  comprehensive analytics and reporting tools.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <MergeIcon className="h-6 w-6 text-gray-900 dark:text-gray-50" />
                  <h3 className="text-lg font-bold">Seamless Collaboration</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Empower your team to work together more effectively with our
                  built-in collaboration features.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <ScalingIcon className="h-6 w-6 text-gray-900 dark:text-gray-50" />
                  <h3 className="text-lg font-bold">Scalable Infrastructure</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Scale your business with ease using our highly scalable and
                  reliable infrastructure.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <LockIcon className="h-6 w-6 text-gray-900 dark:text-gray-50" />
                  <h3 className="text-lg font-bold">
                    Enterprise-grade Security
                  </h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Protect your data and ensure compliance with our robust
                  security features and controls.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <MergeIcon className="h-6 w-6 text-gray-900 dark:text-gray-50" />
                  <h3 className="text-lg font-bold">Seamless Integrations</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Easily connect your favorite tools and apps with our
                  comprehensive integration capabilities.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="testimonials"
          className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What Our Customers Say
                </h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from our satisfied customers about how Acme SaaS has
                  transformed their businesses.
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="h-full">
                  <CardContent className="space-y-4">
                    <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal">
                      “Acme SaaS has been a game-changer for our business. The
                      platform is intuitive, and the customer support is
                      exceptional.”
                    </blockquote>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder-avatar.svg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">John Doe</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          CEO, Acme Inc
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="h-full">
                  <CardContent className="space-y-4">
                    <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal">
                      “Acme SaaS has streamlined our operations and increased
                      our efficiency tenfold. Highly recommended!”
                    </blockquote>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder-avatar.svg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">Jane Smith</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          COO, Acme Corp
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="h-full">
                  <CardContent className="space-y-4">
                    <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal">
                      “Acme SaaS has been a game-changer for our business. The
                      platform is intuitive, and the customer support is
                      exceptional.”
                    </blockquote>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder-avatar.svg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">Bob Johnson</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          CTO, Acme LLC
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Flexible Pricing to Fit Your Needs
                </h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that works best for your business and scale as
                  you grow.
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Starter</CardTitle>
                    <div className="text-4xl font-bold">
                      $0
                      <span className="text-lg font-normal text-gray-500 dark:text-gray-400">
                        /mo
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-gray-900 dark:text-gray-50" />
                        Up to 5 users
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-gray-900 dark:text-gray-50" />
                        5GB storage
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-gray-900 dark:text-gray-50" />
                        Basic features
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button>Get Started</Button>
                  </CardFooter>
                </Card>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Starter</CardTitle>
                    <div className="text-4xl font-bold">
                      $9
                      <span className="text-lg font-normal text-gray-500 dark:text-gray-400">
                        /mo
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-gray-900 dark:text-gray-50" />
                        Up to 5 users
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-gray-900 dark:text-gray-50" />
                        5GB storage
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-gray-900 dark:text-gray-50" />
                        Basic features
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button>Get Started</Button>
                  </CardFooter>
                </Card>

                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Starter</CardTitle>
                    <div className="text-4xl font-bold">
                      $29
                      <span className="text-lg font-normal text-gray-500 dark:text-gray-400">
                        /mo
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-gray-900 dark:text-gray-50" />
                        Up to 5 users
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-gray-900 dark:text-gray-50" />
                        5GB storage
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-gray-900 dark:text-gray-50" />
                        Basic features
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button>Get Started</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
