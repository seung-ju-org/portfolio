import { ContactForm } from "@/components/portfolio/contact-form";
import { Reveal } from "@/components/reveal";
import { getMessages, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type ContactSectionProps = {
  locale?: Locale;
  compactTop?: boolean;
};

export function ContactSection({ locale = "ko", compactTop = false }: ContactSectionProps) {
  const t = getMessages(locale);

  return (
    <section className={cn("container pb-14 pt-14 md:pb-20 md:pt-20", compactTop && "pt-4 md:pt-6")} id="contact">
      <Reveal className="interactive-card rounded-3xl border bg-card p-8 md:p-10">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold !leading-[1.35]">{t.contact.title}</h2>
            <p className="mt-3 text-muted-foreground">{t.contact.description}</p>
          </div>
        </div>
        <div className="mt-6 grid gap-3 text-sm text-muted-foreground">
          <p>
            {t.contact.email}: <span className="font-medium text-foreground">seung-ju@seung-ju.com</span>
          </p>
          <p>
            {t.contact.phone}: <span className="font-medium text-foreground">+82 10 8327 3235</span>
          </p>
        </div>
        <ContactForm
          labels={{
            email: t.contact.formEmail,
            phone: t.contact.formPhone,
            subject: t.contact.formSubject,
            message: t.contact.formMessage,
            submit: t.contact.formSubmit,
            sending: t.contact.formSending,
            success: t.contact.formSuccess,
            error: t.contact.formError
          }}
        />
      </Reveal>
    </section>
  );
}
