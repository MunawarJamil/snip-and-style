"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, CheckCircle2, Clock } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categories, services } from "@/data/services";
import {
  type BookingValues,
  TIME_SLOTS,
  bookingSchema,
} from "@/features/booking/schema";
import { cn, formatDuration, formatPKR } from "@/lib/utils";

function todayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  // YYYY-MM-DD in local time
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory =
    (searchParams.get("category") as "women" | "men" | null) ?? "women";
  const initialServiceSlug = searchParams.get("service") ?? "";

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      category: initialCategory,
      serviceSlug: initialServiceSlug,
      date: "",
      time: undefined,
      notes: "",
    },
  });

  const watchCategory = watch("category");
  const watchService = watch("serviceSlug");

  // Filter services by selected category
  const availableServices = useMemo(
    () => services.filter((s) => s.categoryId === watchCategory),
    [watchCategory],
  );

  // If category changes and current service no longer belongs, clear it
  useEffect(() => {
    if (
      watchService &&
      !availableServices.some((s) => s.slug === watchService)
    ) {
      reset((prev) => ({ ...prev, serviceSlug: "" }));
    }
  }, [watchCategory, availableServices, watchService, reset]);

  const selectedService = availableServices.find(
    (s) => s.slug === watchService,
  );

  async function onSubmit(values: BookingValues) {
    // Simulate a tiny network round-trip so the UI feels real
    await new Promise((r) => setTimeout(r, 700));

    toast.success("Appointment requested", {
      description: `Thanks ${values.fullName.split(" ")[0]} — our team will reach out shortly to confirm your slot.`,
      duration: 6000,
    });

    reset({
      fullName: "",
      phone: "",
      email: "",
      category: values.category,
      serviceSlug: "",
      date: "",
      time: undefined,
      notes: "",
    });

    // Smooth scroll back to top so the toast is visible above the form
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Surface success state for screen readers / future routing if desired
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-10 md:grid-cols-12 md:gap-12"
    >
      {/* Left — fields */}
      <div className="md:col-span-7">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Full name" error={errors.fullName?.message} required>
            <Input
              {...register("fullName")}
              autoComplete="name"
              placeholder="Ayesha Rauf"
              className="h-11 rounded-none bg-noir-soft text-ivory placeholder:text-ivory/35"
              aria-invalid={!!errors.fullName}
            />
          </Field>

          <Field label="Phone" error={errors.phone?.message} required>
            <Input
              {...register("phone")}
              autoComplete="tel"
              inputMode="tel"
              placeholder="+92 300 123 4567"
              className="h-11 rounded-none bg-noir-soft text-ivory placeholder:text-ivory/35"
              aria-invalid={!!errors.phone}
            />
          </Field>

          <Field
            label="Email"
            hint="optional"
            error={errors.email?.message}
            className="sm:col-span-2"
          >
            <Input
              type="email"
              {...register("email")}
              autoComplete="email"
              placeholder="you@example.com"
              className="h-11 rounded-none bg-noir-soft text-ivory placeholder:text-ivory/35"
              aria-invalid={!!errors.email}
            />
          </Field>

          <Field label="Studio" error={errors.category?.message} required>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    className="h-11 w-full rounded-none border-input bg-noir-soft px-4 text-ivory data-placeholder:text-ivory/40"
                    aria-invalid={!!errors.category}
                  >
                    <SelectValue placeholder="Choose studio" />
                  </SelectTrigger>
                  <SelectContent
                    className="rounded-none border-ivory/15 bg-noir-soft text-ivory"
                    position="popper"
                  >
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id} className="rounded-none">
                        For {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>

          <Field label="Service" error={errors.serviceSlug?.message} required>
            <Controller
              control={control}
              name="serviceSlug"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    className="h-11 w-full rounded-none border-input bg-noir-soft px-4 text-ivory data-placeholder:text-ivory/40"
                    aria-invalid={!!errors.serviceSlug}
                  >
                    <SelectValue placeholder="Pick a service" />
                  </SelectTrigger>
                  <SelectContent
                    className="rounded-none border-ivory/15 bg-noir-soft text-ivory"
                    position="popper"
                  >
                    {availableServices.map((s) => (
                      <SelectItem
                        key={s.id}
                        value={s.slug}
                        className="rounded-none"
                      >
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>

          <Field label="Preferred date" error={errors.date?.message} required>
            <div className="relative">
              <Input
                type="date"
                min={todayISO()}
                {...register("date")}
                className="h-11 rounded-none bg-noir-soft pr-10 text-ivory placeholder:text-ivory/35 [color-scheme:dark]"
                aria-invalid={!!errors.date}
              />
              <CalendarDays className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ivory/55" />
            </div>
          </Field>

          <Field label="Preferred time" error={errors.time?.message} required>
            <Controller
              control={control}
              name="time"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    className="h-11 w-full rounded-none border-input bg-noir-soft px-4 text-ivory data-placeholder:text-ivory/40"
                    aria-invalid={!!errors.time}
                  >
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent
                    className="rounded-none border-ivory/15 bg-noir-soft text-ivory"
                    position="popper"
                  >
                    {TIME_SLOTS.map((t) => (
                      <SelectItem key={t} value={t} className="rounded-none">
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>

          <Field
            label="Anything else?"
            hint="optional"
            error={errors.notes?.message}
            className="sm:col-span-2"
          >
            <Textarea
              {...register("notes")}
              rows={4}
              placeholder="Allergies, references, occasions, or anything we should know."
              className="rounded-none bg-noir-soft text-ivory placeholder:text-ivory/35"
              aria-invalid={!!errors.notes}
            />
          </Field>
        </div>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="group h-12 rounded-none bg-gold px-7 text-noir hover:bg-ivory disabled:opacity-60"
          >
            {isSubmitting ? (
              <>Sending…</>
            ) : (
              <>
                Request appointment
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
          <p className="text-[11px] uppercase tracking-[0.2em] text-ivory/45">
            We confirm by phone within an hour
          </p>
        </div>

        {isSubmitSuccessful ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-start gap-3 border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200"
          >
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            <p>
              Request received. Check your phone — our team will reach out
              shortly to confirm your slot.
            </p>
          </motion.div>
        ) : null}
      </div>

      {/* Right — live summary */}
      <aside className="md:col-span-5">
        <div className="sticky top-24 border border-ivory/10 bg-noir-soft p-7 md:p-8">
          <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-gold/60" />
            Your booking
          </span>
          <h3 className="font-display mt-4 text-2xl tracking-tight text-ivory md:text-[1.6rem]">
            {selectedService ? selectedService.name : "Pick a service"}
          </h3>
          <p className="mt-3 min-h-[3rem] text-sm leading-relaxed text-ivory-dim">
            {selectedService
              ? selectedService.description
              : "Choose a studio and a service on the left and we'll surface the details here."}
          </p>

          {selectedService ? (
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-ivory/10 pt-5">
              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-ivory/55">
                  Duration
                </span>
                <p className="font-display mt-1.5 inline-flex items-center gap-2 text-base text-ivory">
                  <Clock className="size-4 text-gold" />
                  {formatDuration(selectedService.duration)}
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-ivory/55">
                  Estimated
                </span>
                <p className="font-display mt-1.5 text-base text-gold">
                  {formatPKR(selectedService.price)}
                </p>
              </div>
            </div>
          ) : null}

          <ul className="mt-7 space-y-3 border-t border-ivory/10 pt-5 text-[12.5px] leading-relaxed text-ivory-dim">
            <li className="flex items-start gap-2.5">
              <span className="mt-1.5 inline-block size-1 rounded-full bg-gold" />
              Free consultation included with every service
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-1.5 inline-block size-1 rounded-full bg-gold" />
              Reschedule up to 24 hours before with no charge
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-1.5 inline-block size-1 rounded-full bg-gold" />
              We'll never pass your details on to anyone
            </li>
          </ul>
        </div>
      </aside>
    </form>
  );
}

interface FieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

function Field({
  label,
  error,
  hint,
  required,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <Label className="text-[10px] font-medium uppercase tracking-[0.22em] text-ivory/70">
          {label}
          {required ? <span className="ml-1 text-gold">·</span> : null}
        </Label>
        {hint ? (
          <span className="text-[10px] uppercase tracking-[0.18em] text-ivory/40">
            {hint}
          </span>
        ) : null}
      </div>
      {children}
      {error ? (
        <p className="text-[11px] text-destructive/90">{error}</p>
      ) : null}
    </div>
  );
}
