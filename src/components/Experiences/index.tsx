"use client";

import { useEffect, useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Experience {
  _id: string;
  title: string;
  company: string;
  span: string;
  location: string;
  imageUrl: string;
  link: string;
}

const Experiences: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [emblaRef] = useEmblaCarousel({ loop: true });

  const fetchExperiences = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_ENDPOINT_PORTFOLIO}/experiences`
      );
      setExperiences(response.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Error fetching experiences");
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  if (loading) {
    return (
      <div className='flex justify-center mt-10'>
        <Skeleton className='h-64 w-[90%] rounded-xl' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center mt-10'>
        <Alert variant='destructive'>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <section className='w-full py-10'>
      <h2 className='text-center text-3xl font-bold mb-8 text-gray-900 dark:text-white'>
        Experiences
      </h2>

      <div className='overflow-hidden max-w-6xl mx-auto py-10' ref={emblaRef}>
        <div className='flex gap-6'>
          {experiences.map((exp) => (
            <Card
              key={exp._id}
              className='min-w-[90%] md:min-w-[60%] lg:min-w-[40%] mx-auto bg-violet-900 text-white'
            >
              <CardHeader className='flex flex-row items-center gap-4'>
                <div className='w-16 h-16 rounded-full overflow-hidden bg-violet-700'>
                  <Image
                    src={exp.imageUrl}
                    alt={exp.company}
                    width={64}
                    height={64}
                    className='rounded-full object-cover'
                  />
                </div>
                <div>
                  <CardTitle className='text-lg'>{exp.title}</CardTitle>
                  <p className='text-sm text-gray-300'>{exp.company}</p>
                </div>
              </CardHeader>
              <CardContent className='space-y-2'>
                <p className='text-sm'>📍 {exp.location}</p>
                <p className='text-sm'>🗓️ {exp.span}</p>
                <div className='pt-3 text-right'>
                  <Button asChild variant='link' className='text-indigo-300 p-0'>
                    <Link href={exp.link} target='_blank' rel='noopener noreferrer'>
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
