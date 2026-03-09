
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
  Search,
  Target
} from "lucide-react"
import { cn } from "@/lib/utils"

interface LibraryPortalProps {
  onSelectDoc: (id: string) => void
  onOpenSearch: () => void
}

export function LibraryPortal({ onSelectDoc, onOpenSearch }: LibraryPortalProps) {
  // Truth of the day
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
      title: "పురాతన ప్రమాణాలు", 
      subtitle: "Ancient Creeds", 
      description: "త్రిత్వము మరియు క్రీస్తు దైవత్వాన్ని చాటిచెప్పే పునాది సత్యాలు.",
      docs: ["apostles-creed", "nicene-creed", "chalcedonian-creed", "athanasian-creed"]
    },
    { 
      title: "సంస్కరణ సిద్ధాంతాలు", 
      subtitle: "Reformation Standards", 
      description: "రక్షణ కేవలం కృప ద్వారానే అని వివరించే చారిత్రక బోధనలు.",
      docs: ["heidelberg", "luther-small-catechism", "belgic-confession", "canons-of-dort"]
    },
    { 
      title: "ఆధునిక ప్రకటనలు", 
      subtitle: "Modern Statements", 
      description: "నేటి కాలపు సవాళ్లకు వాక్యానుసారమైన సమాధానాలు.",
      docs: ["chicago-statement", "nashville-statement"]
    }
  ]

  return (
    <div className="space-y-16 pb-20 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative py-16 px-6 rounded-[2rem] bg-primary/5 border-2 border-primary/10 overflow-hidden text-center">
        <div className="absolute top-0 left-0 p-8 opacity-5">
          <History className="w-48 h-48 text-primary" />
        </div>
        <div className="absolute bottom-0 right-0 p-8 opacity-5">
          <Sparkles className="w-48 h-48 text-primary" />
        </div>
        
        <Badge variant="outline" className="mb-6 telugu-text border-primary/30 text-primary px-6 py-1 text-lg rounded-full">విశ్వాస సంగ్రహం</Badge>
        
        <h1 className="telugu-heading text-4xl md:text-6xl font-bold mb-8 max-w-4xl mx-auto leading-tight">
          క్రైస్తవ విశ్వాస ప్రమాణాలు మరియు జ్ఞానబోధల సంగ్రహం
        </h1>
        
        <p className="telugu-text text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
          శతాబ్దాలుగా క్రైస్తవ సంఘం అంగీకరించిన సత్యాలను, విశ్వాస ప్రమాణాలను మరియు అమూల్యమైన బోధనలను ఒకే చోట చేర్చే డిజిటల్ గ్రంథాలయం ఇది. అపొస్తలుల కాలం నుండి నేటి వరకు, దేవుని వాక్యాధారంగా రూపొందించబడిన ఈ పత్రాలు మన విశ్వాసానికి పునాదిగా ఉన్నాయి.
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
              <span className="telugu-text text-lg text-muted-foreground">విశ్వాస సత్యాలను వెతకండి...</span>
            </div>
            <div className="bg-primary text-primary-foreground p-2 rounded-full hidden sm:block group-hover:scale-110 transition-transform">
              <ChevronRight className="w-4 h-4" />
            </div>
          </Button>
        </div>
      </section>

      {/* Goal Section */}
      <section className="max-w-4xl mx-auto bg-card border-2 border-dashed border-primary/20 rounded-2xl p-8 text-center relative overflow-hidden">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Target className="w-6 h-6 text-primary" />
          <h2 className="telugu-heading text-2xl font-bold">మా లక్ష్యం (Our Goal)</h2>
        </div>
        <p className="telugu-text text-xl text-foreground/80 italic leading-relaxed">
          "దేవుని మహిమ కొరకు మరియు విశ్వాసుల ఆత్మీయ క్షేమం కొరకు, ఈ సత్యాలను తెలుగు భాషలో అందరికీ అందుబాటులోకి తీసుకురావడమే మా ఉద్దేశ్యం."
        </p>
      </section>

      {/* Browse by Era */}
      <section className="space-y-8">
        <h2 className="telugu-heading text-3xl font-bold flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <History className="w-6 h-6 text-primary" />
          </div>
          ముఖ్య విభాగాలు (Core Sections)
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {eras.map((era, idx) => (
            <Card key={idx} className="border-2 hover:border-primary/40 transition-all shadow-sm overflow-hidden group hover:shadow-lg">
              <CardContent className="p-8 space-y-5">
                <div className="space-y-1">
                  <h3 className="telugu-heading text-2xl font-bold group-hover:text-primary transition-colors">{era.title}</h3>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">{era.subtitle}</p>
                </div>
                <p className="telugu-text text-lg opacity-80 leading-relaxed min-h-[4rem]">
                  {era.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                  {era.docs.map(docId => {
                    const doc = LIBRARY_DATA.find(d => d.id === docId)
                    if (!doc) return null
                    return (
                      <button 
                        key={docId}
                        onClick={() => onSelectDoc(docId)}
                        className="text-[10px] bg-muted hover:bg-primary hover:text-primary-foreground px-3 py-1.5 rounded-full transition-colors font-bold uppercase tracking-tight"
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
      <section className="space-y-8">
        <h2 className="telugu-heading text-3xl font-bold">విశ్వాస వర్గాలు (Categories)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="flex flex-col items-center justify-center p-6 bg-card border-2 rounded-2xl hover:border-primary hover:shadow-md transition-all space-y-3 group"
            >
              <div className={cn("p-4 rounded-full bg-muted group-hover:bg-primary/10 transition-colors", cat.color)}>
                <cat.icon className="w-8 h-8" />
              </div>
              <span className="telugu-text text-sm font-bold text-center leading-tight">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Truth of the Day Card */}
      <section>
        <Card className="border-2 border-accent relative overflow-hidden bg-accent/5 rounded-[2rem]">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <BookOpen className="w-32 h-32" />
          </div>
          <CardContent className="p-8 md:p-16">
            <div className="flex items-center gap-2 mb-8">
              <Badge className="bg-accent text-accent-foreground hover:bg-accent/90 px-4 py-1 text-sm">నేటి సత్యం (Truth of the Day)</Badge>
            </div>
            <div className="space-y-8 max-w-4xl">
              <h3 className="telugu-heading text-3xl md:text-5xl font-bold text-primary italic leading-tight">
                "{truthOfTheDay.title}"
              </h3>
              <p className="telugu-text text-2xl md:text-4xl leading-relaxed font-medium text-foreground/90">
                {truthOfTheDay.content}
              </p>
              <Button 
                onClick={() => onSelectDoc(truthOfTheDay.docId)}
                size="lg"
                className="telugu-text rounded-full h-14 px-10 text-xl shadow-xl mt-6"
              >
                పూర్తిగా చదవండి <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
