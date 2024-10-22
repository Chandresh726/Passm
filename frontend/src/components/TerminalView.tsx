import { useEffect, useRef, useState } from 'react';
import { AspectRatio } from './ui/aspect-ratio';
import { Button } from './ui/button';

export default function TerminalView() {

    const [terminalContent, setTerminalContent] = useState<string[]>([
        '> passm init',
        'Create a master password:',
        'Master password: ********',
        'Password manager initialized.',
    ])

    const runCommand = (command: string) => {
        let output: string[] = []
        switch (command) {
            case 'init':
                output = [
                    '> passm init',
                    'Create a master password:',
                    'Master password: ********',
                    'Password manager initialized.',
                ]
                break
            case 'add':
                output = [
                    '> passm add youtube -u akash_123 -p ygfyg1huy3',
                    'Password entry added successfully.',
                ]
                break
            case 'list':
                output = [
                    '> passm list',
                    'Service: youtube, Username: akash_123',
                    'Service: google, Username: akashsingh',
                ]
                break
            case 'get':
                output = [
                    '> passm get youtube',
                    'Enter your master password:',
                    'Master password: ********',
                    'Username: akash_123',
                    'Password: ygfyg1huy3',
                ]
                break
        }
        setTerminalContent(prev => [...prev, ...output])
    }

    const terminalRef = useRef<HTMLDivElement>(null);

    // Scroll to the bottom when terminalContent changes
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [terminalContent]);

    return (
        <div>
            <div className="md:w-3/5 lg:w-1/2 mx-auto bg-gray-900 rounded-lg shadow-lg">
                <div className="flex items-center p-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <AspectRatio ratio={16 / 9}>
                    <div className="px-4 h-full overflow-y-auto" ref={terminalRef}>
                        <div className="font-mono text-sm sm:text-base text-green-400">
                            {terminalContent.map((line, index) => (
                                <div key={index} className="mb-2">
                                    <span className="text-blue-400">{line.startsWith('>') ? '❯' : ''}</span> {line.startsWith('>') ? line.slice(1) : line}
                                </div>
                            ))}
                        </div>
                    </div>
                </AspectRatio>
            </div>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 lg:w-1/2 mx-auto">
                <Button
                    variant="outline"
                    onClick={() => runCommand('init')}
                    className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50 transition-colors duration-300"
                >
                    Initialize
                </Button>
                <Button
                    variant="outline"
                    onClick={() => runCommand('add')}
                    className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50 transition-colors duration-300"
                >
                    Add Password
                </Button>
                <Button
                    variant="outline"
                    onClick={() => runCommand('list')}
                    className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50 transition-colors duration-300"
                >
                    List All Entries
                </Button>
                <Button
                    variant="outline"
                    onClick={() => runCommand('get')}
                    className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50 transition-colors duration-300"
                >
                    Get back password
                </Button>
            </div>
        </div>
    );
}