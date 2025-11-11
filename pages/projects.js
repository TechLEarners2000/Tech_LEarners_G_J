import Head from 'next/head'
import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'
import Card from '../components/Card'

const projects = [
  {
    name: 'ROBOT',
    status: 'Prototype',
    desc: 'AI-powered autonomous assistant built from repurposed computer components, capable of speech interaction, visual recognition, and smart task automation without cloud dependency.',
    tech: ['Python', 'OpenCV', 'SpeechRecognition', 'pyttsx3', 'Edge Computing', 'Sensor & Motor Control', 'Custom Autostart Script'],
    icon: '🤖'
  }
  ,
  {
    name: 'Smart Mobile ATM',
    status: 'Prototype',
    desc: 'IoT-enabled portable ATM system that provides secure cash withdrawal, deposit, and KYC verification services through mobile units equipped with biometric and GPS tracking.',
    tech: ['IoT Sensors', 'Raspberry Pi', 'Biometric Module', 'GPS & GSM', 'Cloud Dashboard', 'Secure API'],
    icon: '🏧'
  }
  ,
  {
    name: 'Warehouse Inventory Tracker',
    status: 'Available',
    desc: 'Automated inventory management system using RFID sensors and computer vision for real-time stock tracking and optimization.',
    tech: ['RFID', 'Computer Vision', 'Database', 'Analytics'],
    icon: '📦'
  }
]

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects — Our IoT & Automation Solutions | TechLEarners</title>
        <link rel="icon" href="/logo.png" />
        <meta name="description" content="Explore our portfolio of IoT and automation projects including energy monitoring, smart scheduling, and inventory tracking systems." />
      </Head>

      <Container className="py-16">
        <SectionTitle subtitle="Real-World Solutions in Action">
          Our Projects
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((p) => (
            <Card key={p.name} className="h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-[var(--accent)] rounded-full flex items-center justify-center text-xl">
                  {p.icon}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${p.status === 'Available' ? 'bg-[var(--cyan)] text-black' :
                  p.status === 'Pilot' ? 'bg-[var(--accent)] text-black' :
                    'bg-gray-600 text-white'
                  }`}>
                  {p.status}
                </span>
              </div>

              <h3 className="font-bold text-xl mb-3">{p.name}</h3>
              <p className="text-[var(--text-secondary)] mb-4 flex-grow leading-relaxed">{p.desc}</p>

              <div className="mt-auto">
                <h4 className="font-semibold text-sm text-[var(--text-secondary)] mb-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-[var(--card)]/50 rounded text-xs text-[var(--text-secondary)]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[var(--accent)] to-[var(--cyan)] rounded-2xl p-8 text-center text-black">
          <h3 className="text-2xl font-bold mb-4">Have a Project in Mind?</h3>
          <p className="text-lg mb-6 opacity-90">Let's discuss how we can bring your ideas to life with our expertise in IoT and automation.</p>
          <a href="/contact" className="inline-block px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
            Start Your Project
          </a>
        </div>
      </Container>
    </>
  )
}
