import { useRef } from 'react'
import { Github, Twitter, Linkedin, Shield, Lock, Key, Database, Mail } from 'lucide-react'
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import DownloadSection from './components/DownloadSection';
import TerminalView from './components/TerminalView';

export default function LandingPage() {

    const downloadRef = useRef<HTMLDivElement>(null)

    const features = [
        { icon: <Shield className="w-12 h-12" />, title: 'Encryption', description: 'Your passwords are protected with AES-256 encryption.' },
        { icon: <Lock className="w-12 h-12" />, title: 'Zero-Knowledge Architecture', description: 'We never see your unencrypted data.' },
        { icon: <Key className="w-12 h-12" />, title: 'Secure Key Derivation', description: 'Uses Argon2 for robust password hashing.' },
        { icon: <Database className="w-12 h-12" />, title: 'Local Storage', description: 'Your data never leaves your device.' },
    ]

    const scrollToDownload = () => {
        downloadRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <header className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-purple-800 to-indigo-800">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="absolute inset-0 opacity-50">
                        {[...Array(100)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute text-white text-opacity-50 text-sm"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animation: `fall ${5 + Math.random() * 20}s linear infinite`,
                                }}
                            >
                                {Math.random() > 0.5 ? '0' : '1'}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="z-10 text-center px-4">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 animate-fade-in-down text-white"> &gt;_ Passm CLI</h1>
                    <p className="text-xl sm:text-2xl mb-8 animate-fade-in-up max-w-2xl mx-auto text-gray-200">Secure, lightning-fast, and user-friendly password management right from your terminal.</p>
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-500 animate-bounce" onClick={scrollToDownload}>
                        Download Now
                    </Button>
                </div>
            </header>

            <section className="mb-16 bg-gradient-to-br from-blue-200 to-purple-200 p-16">
                <h2 className="text-4xl font-semibold mb-12 text-center">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader>
                                <div className="w-16 h-16 mx-auto mb-4 text-blue-600">{feature.icon}</div>
                                <CardTitle className="text-2xl font-semibold text-center">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-center">{feature.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">Experience it</h2>
                <div className='mx-4 lg:m-0'>
                    <TerminalView />
                </div>

            </section>

            <section className="bg-gradient-to-br from-green-200 to-blue-300 py-32" ref={downloadRef}>
                <h2 className="text-4xl font-semibold mb-12 text-center">Download</h2>
                <DownloadSection />
            </section>

            <footer className="bg-gray-800 py-8">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center space-x-8 mb-4">
                        <a href="https://github.com/Chandresh726" target='_blank' className="text-gray-400 hover:text-white transition-colors duration-300">
                            <Github className="w-8 h-8" />
                        </a>
                        <a href="https://x.com/Chandresh_726" target='_blank' className="text-gray-400 hover:text-white transition-colors duration-300">
                            <Twitter className="w-8 h-8" />
                        </a>
                        <a href="https://www.linkedin.com/in/kchandresh726/" target='_blank' className="text-gray-400 hover:text-white transition-colors duration-300">
                            <Linkedin className="w-8 h-8" />
                        </a>
                        <a href="mailto: kchandresh726@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-300">
                            <Mail className="w-8 h-8" />
                        </a>
                    </div>
                    <p className="text-center text-gray-400">
                        © 2024 Passm CLI. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}