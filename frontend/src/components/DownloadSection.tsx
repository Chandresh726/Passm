import { Download } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function DownloadSection() {

    const handleDownload = async (platform: string) => {
        try {
            const response = await fetch(`https://passm.s3.ap-south-1.amazonaws.com/passm-cli-${platform}.exe`)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.style.display = 'none'
            a.href = url
            a.download = `passm-cli-${platform}.exe`
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Download failed:', error)
        }
    }

    return (
        <Tabs defaultValue="windows" className="w-full max-w-2xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="windows">Windows</TabsTrigger>
                <TabsTrigger value="mac">Mac</TabsTrigger>
                <TabsTrigger value="linux">Linux</TabsTrigger>
            </TabsList>
            <TabsContent value="windows">
                <Card className="bg-white shadow-lg">
                    <CardContent className="p-6 text-center">
                        <h3 className="text-2xl font-semibold mb-4">Download for Windows</h3>
                        <Button
                            size="lg"
                            className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-300"
                            onClick={() => handleDownload('windows')}
                        >
                            <Download className="mr-2 h-4 w-4 " /> Windows Executable
                        </Button>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="mac">
                <Card className="bg-white shadow-lg">
                    <CardContent className="p-6 text-center">
                        <h3 className="text-2xl font-semibold mb-4">Mac Version Coming Soon</h3>
                        <p className="text-gray-600 mb-4">We're working on bringing Passm CLI to Mac. Stay tuned!</p>
                        <Button size="lg" className="bg-gray-400 text-white cursor-not-allowed" disabled>Coming Soon</Button>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="linux">
                <Card className="bg-white shadow-lg">
                    <CardContent className="p-6 text-center">
                        <h3 className="text-2xl font-semibold mb-4">Linux Version Coming Soon</h3>
                        <p className="text-gray-600 mb-4">We're working on bringing Passm CLI to Linux. Stay tuned!</p>
                        <Button size="lg" className="bg-gray-400 text-white cursor-not-allowed" disabled>Coming Soon</Button>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}