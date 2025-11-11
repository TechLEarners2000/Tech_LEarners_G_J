import Head from 'next/head'
import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'
import Card from '../components/Card'
import Button from '../components/Button'

export default function Services(){
  return (
    <>
      <Head>
        <title>Services — IoT, Automation & Web Solutions | TechLEarners</title>
        <link rel="icon" href="/logo.png" />
        <meta name="description" content="Explore our comprehensive services: IoT & automation solutions, web development, and ongoing support for your business needs." />
      </Head>

      <Container className="py-16">
        <SectionTitle subtitle="Comprehensive Technology Solutions">
          Our Services
        </SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="h-full">
            <div className="w-16 h-16 bg-[var(--accent)] rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📡</span>
            </div>
            <h3 className="font-bold text-2xl mb-3">IoT & Automation</h3>
            <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">We build comprehensive IoT solutions that connect devices, collect data, and automate processes for improved efficiency and insights.</p>
            <ul className="text-[var(--text-secondary)] space-y-2 mb-6">
              <li>• Real-time monitoring & data collection</li>
              <li>• Remote device control & management</li>
              <li>• Intelligent scheduling & automation rules</li>
              <li>• Edge computing & local processing</li>
              <li>• Sensor integration & calibration</li>
              <li>• Deployment & maintenance support</li>
            </ul>
          </Card>

          <Card className="h-full">
            <div className="w-16 h-16 bg-[var(--cyan)] rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">💻</span>
            </div>
            <h3 className="font-bold text-2xl mb-3">Web & Software Development</h3>
            <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">Custom web applications, dashboards, and backend systems that turn your data into actionable insights and streamlined workflows.</p>
            <ul className="text-[var(--text-secondary)] space-y-2 mb-6">
              <li>• Interactive web dashboards</li>
              <li>• RESTful APIs & microservices</li>
              <li>• Workflow automation systems</li>
              <li>• Custom integrations & connectors</li>
              <li>• Progressive Web Apps (PWAs)</li>
              <li>• Prototyping & MVP development</li>
            </ul>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-[var(--card)] to-[var(--card)]/80 rounded-2xl p-8 mb-16">
          <SectionTitle subtitle="Ongoing Partnership">
            Consulting & Support
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🎯</span>
              </div>
              <h4 className="font-bold mb-2">Technical Consulting</h4>
              <p className="text-sm text-[var(--text-secondary)]">Expert guidance on technology choices and architecture design.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[var(--cyan)] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">⚡</span>
              </div>
              <h4 className="font-bold mb-2">Rapid Prototyping</h4>
              <p className="text-sm text-[var(--text-secondary)]">Quick proof-of-concept development to validate ideas.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">📚</span>
              </div>
              <h4 className="font-bold mb-2">Training & Documentation</h4>
              <p className="text-sm text-[var(--text-secondary)]">Comprehensive documentation and team training.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[var(--cyan)] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🛠️</span>
              </div>
              <h4 className="font-bold mb-2">24/7 Support</h4>
              <p className="text-sm text-[var(--text-secondary)]">Round-the-clock technical support and maintenance.</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-lg text-[var(--text-secondary)] mb-6">Let's discuss how our services can help transform your operations.</p>
          <Button variant="primary" className="px-8 py-3">
            <a href="/contact">Request Consultation</a>
          </Button>
        </div>
      </Container>
    </>
  )
}
