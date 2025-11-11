import Head from 'next/head'
import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'
import Card from '../components/Card'

export default function About(){
  return (
    <>
      <Head>
        <title>About TechLEarners — Our Mission & Team</title>
        <link rel="icon" href="/logo.png" />
        <meta name="description" content="Learn about TechLEarners - our mission to build practical IoT and web solutions, and meet our expert team." />
      </Head>

      <Container className="py-16">
        <SectionTitle subtitle="Building Practical Solutions">
          About TechLEarners
        </SectionTitle>

        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-6">
            TechLEarners builds practical IoT, automation and web solutions focused on delivering measurable outcomes for teams.
            We prototype quickly, iterate with real users, and take care of deployments and maintenance.
          </p>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Our approach combines technical expertise with business acumen to create solutions that not only work but drive real value.
            From concept to deployment, we're with you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="text-center">
            <div className="w-20 h-20 bg-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👨‍💻</span>
            </div>
            <h4 className="font-bold text-xl mb-2">Jay Harish P — CTO</h4>
            <p className="text-[var(--text-secondary)]">Technical lead focused on embedded systems, cloud integrations and scalable backends. Expert in IoT architectures and full-stack development.</p>
          </Card>
          <Card className="text-center">
            <div className="w-20 h-20 bg-[var(--cyan)] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👨‍💼</span>
            </div>
            <h4 className="font-bold text-xl mb-2">Gery Anton G — COO</h4>
            <p className="text-[var(--text-secondary)]">Operations and client engagement lead ensuring timely delivery and customer success. Specializes in project management and client relations.</p>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="Our Unique Approach">
            What Makes Us Different
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card hover={false} className="text-center">
              <div className="w-12 h-12 bg-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🚀</span>
              </div>
              <h3 className="font-bold mb-2">Speed to Market</h3>
              <p className="text-sm text-[var(--text-secondary)]">We focus on practical prototypes, rapid iteration with users, and smooth handoffs into production.</p>
            </Card>
            <Card hover={false} className="text-center">
              <div className="w-12 h-12 bg-[var(--cyan)] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🎯</span>
              </div>
              <h3 className="font-bold mb-2">Results-Driven</h3>
              <p className="text-sm text-[var(--text-secondary)]">No hype — just working solutions that save time and reduce operational friction.</p>
            </Card>
            <Card hover={false} className="text-center">
              <div className="w-12 h-12 bg-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🤝</span>
              </div>
              <h3 className="font-bold mb-2">End-to-End Support</h3>
              <p className="text-sm text-[var(--text-secondary)]">From initial consultation through deployment and ongoing maintenance, we're here for the long term.</p>
            </Card>
          </div>
        </div>
      </Container>
    </>
  )
}
