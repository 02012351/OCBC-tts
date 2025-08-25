"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Play, Volume2 } from "lucide-react"

export default function TextToSpeechPage() {
  const [isGenerated, setIsGenerated] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [formData, setFormData] = useState({
    voiceId: "Cantonese Female (HK)",
    speed: "1.0",
    text: "",
  })

  const handleGenerate = () => {
    if (formData.text.trim()) {
      setIsGenerated(true)
    }
  }

  const handleRegenerate = () => {
    setIsGenerated(false)
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-600">
            <div className="w-6 h-6">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
              </svg>
            </div>
            <span className="font-semibold text-lg">Text to Speech</span>
          </div>
          <div className="flex items-center">
            <img src="/ocbc-icon.png" alt="OCBC" className="h-8 w-auto" />
          </div>
        </div>
      </header>

      <section className="bg-[#e8f0f4] mx-6 rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-md">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Text to Speech</h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Choose from various models and voices to generate speech from text.
            </p>
          </div>
          <div className="flex-shrink-0 ml-8">
            <img src="/rl.png" alt="Professional microphone" className="w-64 h-48 object-contain" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6">
        {!isGenerated ? (
          /* Updated form styling to match exact design */
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Generate Speech</h2>
              <p className="text-gray-600">Choose a model, voice, and style to turn text into natural speech.</p>
            </div>

            <div className="space-y-6">
              {/* Voice ID Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Voice ID</label>
                <div className="flex gap-2">
                  <Select
                    value={formData.voiceId}
                    onValueChange={(value) => setFormData({ ...formData, voiceId: value })}
                  >
                    <SelectTrigger className="flex-1 h-12 bg-white border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cantonese Female (HK)">Cantonese Female (HK)</SelectItem>
                      <SelectItem value="English Male (US)">English Male (US)</SelectItem>
                      <SelectItem value="English Female (UK)">English Female (UK)</SelectItem>
                      <SelectItem value="Spanish Female (ES)">Spanish Female (ES)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    className="h-12 px-4 bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    Play Sample
                  </Button>
                </div>
              </div>

              {/* Speed Control */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Speed</label>
                <Select value={formData.speed} onValueChange={(value) => setFormData({ ...formData, speed: value })}>
                  <SelectTrigger className="w-full h-12 bg-white border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5">0.5</SelectItem>
                    <SelectItem value="0.75">0.75</SelectItem>
                    <SelectItem value="1.0">1.0</SelectItem>
                    <SelectItem value="1.25">1.25</SelectItem>
                    <SelectItem value="1.5">1.5</SelectItem>
                    <SelectItem value="2.0">2.0</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Text Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Text</label>
                <Textarea
                  placeholder="Type your text here. E.g., Hello and Welcome to our demo!"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  className="min-h-32 resize-none bg-white border-gray-200"
                />
              </div>

              {/* Generate Button */}
              <div className="pt-4">
                <Button
                  onClick={handleGenerate}
                  className="w-full bg-sky-400 hover:bg-sky-500 text-white py-4 text-lg font-medium rounded-lg"
                  disabled={!formData.text.trim()}
                >
                  Generate
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Your audio is ready!</h2>
              <p className="text-gray-600">Preview, download, regenerate.</p>
            </div>

            {/* Audio Player Card */}
            <Card className="p-6 bg-white border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-medium text-gray-700">Audio</span>
                <div className="flex gap-3">
                  <Button className="bg-sky-400 hover:bg-sky-500 text-white px-6 py-2 rounded-lg">Download</Button>
                  <Button
                    variant="outline"
                    onClick={handleRegenerate}
                    className="border-sky-400 text-sky-600 hover:bg-sky-50 px-6 py-2 rounded-lg bg-transparent"
                  >
                    Regenerate
                  </Button>
                </div>
              </div>

              {/* Audio Waveform */}
              <div className="flex items-center gap-4">
                <Button
                  onClick={togglePlayback}
                  className="bg-sky-400 hover:bg-sky-500 text-white rounded-full w-12 h-12 p-0 flex-shrink-0"
                >
                  <Play className="w-5 h-5" fill="currentColor" />
                </Button>

                {/* Waveform Visualization */}
                <div className="flex-1 flex items-center justify-center gap-1 h-12">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 bg-sky-400 rounded-full transition-all duration-150 ${
                        isPlaying && i < 25 ? "opacity-100" : "opacity-60"
                      }`}
                      style={{
                        height: `${Math.random() * 24 + 8}px`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
