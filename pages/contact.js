import Head from 'next/head'
import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'
import ContactForm from '../components/ContactForm'
import Button from '../components/Button'

export default function Contact(){
  return (
    <>
      <Head>
        <title>Contact TechLEarners — Request Consultation</title>
        <link rel="icon" href="/logo.png" />
        <meta name="description" content="Get in touch with TechLEarners for IoT and automation solutions. Request a consultation or discuss your project ideas." />
      </Head>

      <Container className="py-16" id="contact">
        <SectionTitle subtitle="Let's Build Something Together">
          Contact Us
        </SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                Reach out for a consultation or to discuss your project ideas. We're here to help you transform your operations with practical IoT and automation solutions.
              </p>
            </div>

            <div className="bg-[var(--card)] rounded-xl p-6">
              <h4 className="font-bold text-lg mb-4">Response Time</h4>
              <p className="text-[var(--text-secondary)] mb-2">We typically respond within 2 business days.</p>
              <p className="text-[var(--text-secondary)] text-sm">For urgent inquiries, please call us directly.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center">
                  <span className="text-lg">📧</span>
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <a href="mailto:techl.earners.offl@gmail.com" className="text-[var(--accent)] hover:underline">
                    techl.earners.offl@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--cyan)] rounded-full flex items-center justify-center">
                  <span className="text-lg">📍</span>
                </div>
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-[var(--text-secondary)]">Remote-first, serving clients worldwide</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center">
                  <span className="text-lg">⏰</span>
                </div>
                <div>
                  <h4 className="font-semibold">Business Hours</h4>
                  <p className="text-[var(--text-secondary)]">Mon-Fri: 9AM - 6PM IST</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[var(--accent)] to-[var(--cyan)] rounded-xl p-6 text-black">
              <h4 className="font-bold text-lg mb-2">Free Initial Consultation</h4>
              <p className="mb-3">Book a 30-minute call to discuss your project and explore how we can help.</p>
              <Button variant="secondary" className="bg-black text-white hover:bg-gray-800" onClick={() => window.location.href = 'tel:+919361310717'}>
                Schedule Call
              </Button>
            </div>
          </div>

          <div className="bg-[var(--card)] rounded-xl p-8">
            <h3 className="text-xl font-bold mb-6">Send us a Message</h3>
            <ContactForm />
          </div>
        </div>
      </Container>
    </>
  )
}
