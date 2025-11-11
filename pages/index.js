import Head from 'next/head'
import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'
import Card from '../components/Card'
import Button from '../components/Button'

export default function Home(){
  return (
    <>
      <Head>
        <title>TechLEarners — Practical IoT & Web Solutions</title>
        <meta name="description" content="TechLEarners - IoT, automation and web solutions for efficient operations" />
        <meta name="keywords" content="IoT, automation, web development, prototypes, TechLEarners" />
        <link rel="icon" href="/logo.png" />
      </Head>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[var(--text)] to-[var(--text-secondary)] bg-clip-text text-transparent">
              TechLEarners
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-8 leading-relaxed">
              We build practical IoT, automation and web solutions that help teams move faster and operate smarter.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="primary" className="text-lg">
                <a href="contact">Request Consultation</a>
              </Button>
              <Button variant="ghost" className="text-lg">
                <a href="projects">View Our Projects</a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-gradient-to-b from-transparent to-[var(--card)]/10">
        <Container>
          <SectionTitle subtitle="Why Choose TechLEarners?">
            Delivering Real Results
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card hover={false} className="text-center">
              <div className="w-16 h-16 bg-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Rapid Prototyping</h3>
              <p className="text-[var(--text-secondary)]">From concept to working prototype in weeks, not months.</p>
            </Card>
            <Card hover={false} className="text-center">
              <div className="w-16 h-16 bg-[var(--cyan)] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="font-bold text-xl mb-2">End-to-End Solutions</h3>
              <p className="text-[var(--text-secondary)]">Hardware, software, and deployment - we handle it all.</p>
            </Card>
            <Card hover={false} className="text-center">
              <div className="w-16 h-16 bg-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Measurable Impact</h3>
              <p className="text-[var(--text-secondary)]">Solutions that reduce costs and improve efficiency.</p>
            </Card>
          </div>
        </Container>
      </section>

      {/* How We Work */}
      <section className="py-16">
        <Container>
          <SectionTitle subtitle="Our Process">
            How We Work
          </SectionTitle>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold">1</div>
                <h3 className="font-bold text-lg mb-2">Discover & Plan</h3>
                <p className="text-[var(--text-secondary)]">Understand your needs and design a solution that fits.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[var(--cyan)] rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold">2</div>
                <h3 className="font-bold text-lg mb-2">Build & Test</h3>
                <p className="text-[var(--text-secondary)]">Rapid prototyping with real user feedback.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold">3</div>
                <h3 className="font-bold text-lg mb-2">Deploy & Support</h3>
                <p className="text-[var(--text-secondary)]">Seamless handoff with ongoing maintenance.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Services */}
      <section className="py-16 bg-gradient-to-b from-[var(--card)]/10 to-transparent">
        <Container>
          <SectionTitle subtitle="What We Offer">
            Core Services
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <h3 className="font-bold text-xl mb-3">IoT & Automation</h3>
              <ul className="text-[var(--text-secondary)] space-y-2">
                <li>• Real-time monitoring</li>
                <li>• Device control</li>
                <li>• Scheduling & rules</li>
                <li>• Deployment & maintenance</li>
              </ul>
            </Card>
            <Card>
              <h3 className="font-bold text-xl mb-3">Web & Software</h3>
              <ul className="text-[var(--text-secondary)] space-y-2">
                <li>• Web dashboards</li>
                <li>• Backend & APIs</li>
                <li>• Workflow automation</li>
                <li>• Custom integrations</li>
              </ul>
            </Card>
            <Card>
              <h3 className="font-bold text-xl mb-3">Consulting & Support</h3>
              <ul className="text-[var(--text-secondary)] space-y-2">
                <li>• Technical consulting</li>
                <li>• Prototyping services</li>
                <li>• Training & documentation</li>
                <li>• 24/7 support</li>
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Operations?</h2>
            <p className="text-xl text-[var(--text-secondary)] mb-8">Let's discuss how we can help you build efficient, scalable solutions.</p>
            <Button variant="secondary" className="text-lg px-8 py-4">
              <a href="contact">Get Started Today</a>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
