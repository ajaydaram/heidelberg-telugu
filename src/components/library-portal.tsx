
"use client"

import * as React from "react"
import { LIBRARY_DATA, Category } from "@/app/lib/data/library-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Globe, 
  Anchor, 
  Flame, 
  Shield, 
  Heart, 
  Clock, 
  History, 
  Sparkles, 
  BookOpen, 
  ChevronRight,
  Search
} from "lucide-react"
import { cn } from "@/lib/utils"

interface LibraryPortalProps {
  onSelectDoc: (id: string) => void
  onOpenSearch: () => void
}

export function LibraryPortal({ onSelectDoc, onOpenSearch }: LibraryPortalProps) {
  // Truth of the day (Static for now, could be randomized)
  const truthOfTheDay = {
    title: "అపొస్తలుల విశ్వాస ప్రమాణము - భాగం 1",
    content: "భూమ్యాకాశములను సృజించిన సర్వశక్తిగల తండ్రియైన దేవుని నేను నమ్ముచున్నాను.",
    docId: "apostles-creed"
  }

  const categories: { id: Category; name: string; icon: any; color: string }[] = [
    { id: "Ecumenical", name: "సార్వత్రిక ప్రమాణాలు", icon: Globe, color: "text-blue-500" },
    { id: "Reformed", name: "రీఫార్మ్డ్ (Reformed)", icon: Anchor, color: "text-cyan-600" },
    { id: "Lutheran", name: "లూథరన్ (Lutheran)", icon: Flame, color: "text-orange-500" },
    { id: "Anglican", name: "ఆంగ్లికన్ (Anglican)", icon: Shield, color: "text-indigo-500" },
    { id: "Baptist", name: "బాప్టిస్ట్ (Baptist)", icon: Heart, color: "text-red-500" },
    { id: "Modern", name: "ఆధునిక ప్రకటనలు", icon: Clock, color: "text-slate-500" },
  ]

  const eras = [
    { 
      title: "ప్రారంభ శతాబ్దాలు", 
      subtitle: "Early Centuries", 
      description: "అపొస్తలుల నుండి నీసియా వరకు సార్వత్రిక క్రైస్తవ పునాదులు.",
      docs: ["apostles-creed", "nicene-creed", "chalcedonian-creed"]
    },
    { 
      title: "సంస్కరణ కాలం", 
      subtitle: "Reformation Era", 
      description: "16వ శతాబ్దపు గొప్ప ఆధ్యాత్మిక జాగృతి మరియు విశ్వాస సత్యాలు.",
      docs: ["heidelberg", "luther-small-catechism", "westminster-shorter-catechism"]
    },
    { 
      title: "ఆధునిక కాలం", 
      subtitle: "Modern Era", 
      description: "నేటి కాలంలో బైబిలు సత్యాలను కాపాడే ఆధునిక ప్రకటనలు.",
      docs: ["nashville-statement", "chicago-statement"]
    }
  ]

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-700">
      {/* Hero AI Search Section */}
      <section className="relative py-12 px-6 rounded-3xl bg-primary/5 border-2 border-primary/10 overflow-hidden text-center">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkles className="w-32 h-32 text-primary" />
        </div>
        <Badge variant="outline" className="mb-4 telugu-text border-primary/30 text-primary px-4">AI-Powered Library</Badge>
        <h1 className="telugu-heading text-4xl md:text-6xl font-bold mb-6">విశ్వాస సత్యాలను వెతకండి</h1>
        <p className="telugu-text text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          40కి పైగా చారిత్రక విశ్వాస ప్రమాణాల నుండి మీకు కావలసిన సమాచారాన్ని తెలుగులో అడిగి తెలుసుకోండి.
        </p>
        <div className="max-w-xl mx-auto">
          <Button 
            size="lg" 
            variant="outline" 
            onClick={onOpenSearch}
            className="w-full h-16 rounded-full border-2 border-primary/20 bg-background shadow-xl hover:bg-accent flex justify-between px-6 group transition-all"
          >
            <div className="flex items-center gap-3">
              <Search className="w-6 h-6 text-primary" />
              <span className="telugu-text text-lg text-muted-foreground">ఉదా: 'పరిశుద్ధాత్మ గురించి ప్రమాణాలు ఏమి చెబుతున్నాయి?'</span>
            </div>
            <div className="bg-primary text-primary-foreground p-2 rounded-full hidden sm:block group-hover:scale-110 transition-transform">
              <ChevronRight className="w-4 h-4" />
            </div>
          </Button>
        </div>
      </section>

      {/* Browse by Era */}
      <section className="space-y-6">
        <h2 className="telugu-heading text-3xl font-bold flex items-center gap-2">
          <History className="w-7 h-7 text-primary" />
          కాలక్రమంగా అన్వేషించండి (Browse by Era)
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {eras.map((era, idx) => (
            <Card key={idx} className="border-2 hover:border-primary/40 transition-all shadow-sm overflow-hidden group">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="telugu-heading text-2xl font-bold group-hover:text-primary transition-colors">{era.title}</h3>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">{era.subtitle}</p>
                </div>
                <p className="telugu-text text-base opacity-80 leading-relaxed line-clamp-2">
                  {era.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {era.docs.map(docId => {
                    const doc = LIBRARY_DATA.find(d => d.id === docId)
                    if (!doc) return null
                    return (
                      <button 
                        key={docId}
                        onClick={() => onSelectDoc(docId)}
                        className="text-[10px] bg-muted hover:bg-primary hover:text-primary-foreground px-2 py-1 rounded transition-colors font-bold uppercase"
                      >
                        {doc.title_en.split(' ')[0]}
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Category Grid */}
      <section className="space-y-6">
        <h2 className="telugu-heading text-3xl font-bold">విశ్వాస వర్గాలు (Categories)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="flex flex-col items-center justify-center p-6 bg-card border-2 rounded-2xl hover:border-primary hover:shadow-md transition-all space-y-3 group"
            >
              <div className={cn("p-3 rounded-full bg-muted group-hover:bg-primary/10 transition-colors", cat.color)}>
                <cat.icon className="w-8 h-8" />
              </div>
              <span className="telugu-text text-sm font-bold text-center leading-tight">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Truth of the Day Card */}
      <section>
        <Card className="border-2 border-accent relative overflow-hidden bg-accent/5">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <BookOpen className="w-24 h-24" />
          </div>
          <CardContent className="p-8 md:p-12">
            <div className="flex items-center gap-2 mb-6">
              <Badge className="bg-accent text-accent-foreground hover:bg-accent/90">నేటి సత్యం (Truth of the Day)</Badge>
            </div>
            <div className="space-y-6 max-w-3xl">
              <h3 className="telugu-heading text-3xl md:text-4xl font-bold text-primary italic">
                "{truthOfTheDay.title}"
              </h3>
              <p className="telugu-text text-2xl md:text-3xl leading-relaxed font-medium">
                {truthOfTheDay.content}
              </p>
              <Button 
                onClick={() => onSelectDoc(truthOfTheDay.docId)}
                className="telugu-text rounded-full h-12 px-8 shadow-lg mt-4"
              >
                పూర్తిగా చదవండి <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
