"use client"

import * as React from "react"
import { LibraryDocument, LibraryItem } from "@/app/lib/data/library-data"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Bookmark, Share2, Info, Lightbulb, ChevronRight, ChevronDown, ListMusic, BookOpenCheck, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

interface DocumentViewerProps {
  document: LibraryDocument
}

export function DocumentViewer({ document: libDoc }: DocumentViewerProps) {
  const [showAllFootnotes, setShowAllFootnotes] = React.useState(false)
  const [selectedFootnote, setSelectedFootnote] = React.useState<{ itemId: string, refNum: string, content: string } | null>(null)

  const findFootnoteContent = (itemId: string, refNum: string) => {
    const item = libDoc.sections.flatMap(s => s.items).find(i => i.id === itemId)
    if (!item || !item.scripture) return "సమాచారం అందుబాటులో లేదు."
    
    // Find scripture string that starts with the reference number (e.g., "1. 2 Timothy...")
    const ref = item.scripture.find(s => s.trim().startsWith(`${refNum}.`))
    return ref || item.scripture[parseInt(refNum) - 1] || "లేఖనము కనుగొనబడలేదు."
  }

  const handleFootnoteClick = (itemId: string, refNum: string) => {
    const content = findFootnoteContent(itemId, refNum)
    setSelectedFootnote({ itemId, refNum, content })
  }

  const renderFormattedText = (text: string, itemId: string) => {
    if (!text) return null;

    const parts = text.split(/(<glossary term=".*?">.*?<\/glossary>|<b>.*?<\/b>|\[\d+\])/g);

    return parts.map((part, index) => {
      if (part.startsWith('<glossary')) {
        const termMatch = part.match(/term="(.*?)"/);
        const contentMatch = part.match(/>(.*?)<\/glossary>/);
        const term = termMatch ? termMatch[1] : '';
        const content = contentMatch ? contentMatch[1] : '';
        
        let explanation = "";
        if (term === "Substance") explanation = "గ్రీకులో 'Homoousios' అంటే తండ్రి మరియు కుమారుడు ఒకే దైవిక సారము కలిగినవారని అర్థం.";
        else if (term === "Incomprehensible") explanation = "దేవుని మన పరిమితమైన బుద్ధితో పూర్తిగా గ్రహించలేము అని అర్థం.";
        else if (term === "Co-eternal") explanation = "ముగ్గురు వ్యక్తులు ఎల్లప్పుడూ ఒకే సమయంలో ఉనికిలో ఉన్నారు.";

        return (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-primary border-b border-dotted border-primary cursor-help font-bold">
                  {content}
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-3 telugu-text text-sm bg-card border-primary/20">
                <p>{explanation}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }

      if (part.startsWith('<b>')) {
        const content = part.replace(/<\/?b>/g, '');
        return <strong key={index} className="font-bold text-foreground">{content}</strong>;
      }

      const footnoteMatch = part.match(/^\[(\d+)\]$/);
      if (footnoteMatch) {
        const num = footnoteMatch[1];
        return (
          <button
            key={index}
            onClick={() => handleFootnoteClick(itemId, num)}
            className="inline-flex items-center justify-center w-7 h-7 -translate-y-2 text-[11px] font-bold text-primary hover:text-primary-foreground hover:bg-primary rounded-full transition-all mx-0.5 border-2 border-primary/30 shadow-sm bg-background"
            title={`రిఫరెన్స్ ${num} చూడండి`}
          >
            {num}
          </button>
        );
      }

      return <span key={index} className="whitespace-pre-wrap">{part}</span>;
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 pb-20">
      <header className="mb-12 text-center relative">
        <div className="absolute top-0 right-0 flex items-center gap-2 bg-muted/30 p-2 rounded-xl border md:flex hidden">
          <Settings2 className="w-4 h-4 text-muted-foreground" />
          <div className="flex items-center space-x-2">
            <Switch 
              id="show-all-refs" 
              checked={showAllFootnotes} 
              onCheckedChange={setShowAllFootnotes}
            />
            <Label htmlFor="show-all-refs" className="telugu-text text-xs font-bold cursor-pointer">లేఖనాలను ఎల్లప్పుడూ చూపు</Label>
          </div>
        </div>

        <Badge variant="outline" className="mb-4 px-4 py-1 text-primary border-primary/30 uppercase tracking-tighter">
          {libDoc.category} • {libDoc.year} AD
        </Badge>
        <h1 className="telugu-heading text-4xl md:text-6xl font-bold mb-4">{libDoc.title_te}</h1>
        <p className="text-xl text-muted-foreground italic">{libDoc.title_en}</p>
        <div className="mt-8 w-24 h-1 bg-accent mx-auto rounded-full" />
      </header>

      {/* Mobile Setting Toggle */}
      <div className="md:hidden flex items-center justify-center gap-4 mb-8 bg-muted/30 p-4 rounded-2xl border-2">
        <BookOpenCheck className="w-5 h-5 text-primary" />
        <div className="flex items-center space-x-2">
          <Switch 
            id="show-all-refs-mobile" 
            checked={showAllFootnotes} 
            onCheckedChange={setShowAllFootnotes}
          />
          <Label htmlFor="show-all-refs-mobile" className="telugu-text text-sm font-bold">లేఖనాలను ఎల్లప్పుడూ చూపు</Label>
        </div>
      </div>

      <div className="space-y-6">
        <Accordion type="single" collapsible className="w-full space-y-4" defaultValue={libDoc.sections[0]?.id}>
          {libDoc.sections.map((section) => (
            <AccordionItem 
              key={section.id} 
              value={section.id} 
              className="border-2 rounded-2xl bg-card overflow-hidden transition-all data-[state=open]:border-primary/40 shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-accent/20">
                <div className="flex flex-col items-start text-left">
                  <span className="telugu-heading text-2xl font-bold text-primary">{section.title}</span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold mt-1">
                    {section.items.length} {libDoc.type === 'catechism' ? 'ప్రశ్నలు' : 'విభాగాలు'}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-8 pt-4">
                <div className="space-y-12">
                  {section.items.map((item) => (
                    <div key={item.id} className="group relative">
                      {libDoc.type === 'catechism' ? (
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <h3 className="telugu-text text-2xl font-bold text-primary border-l-4 border-accent pl-4">
                              ప్రశ్న {item.number}: {item.question}
                            </h3>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Bookmark className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Share2 className="h-4 w-4" /></Button>
                            </div>
                          </div>
                          <div className="telugu-text text-xl md:text-2xl pl-5 whitespace-pre-wrap leading-relaxed">
                            <span className="font-bold opacity-70 block mb-2 telugu-heading text-lg">జవాబు:</span>
                            {renderFormattedText(item.answer || '', item.id)}
                          </div>
                          {item.explanation && (
                            <div className="mt-4 p-5 bg-muted/40 border-l-4 border-primary/30 rounded-r-xl italic telugu-text ml-5 text-foreground/80">
                              <span className="font-bold not-italic block mb-2 telugu-heading text-sm uppercase opacity-70">వివరణ:</span>
                              {item.explanation}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <h3 className="telugu-heading text-2xl font-bold text-accent-foreground">
                              {item.title || `Article ${item.number || ''}`}
                            </h3>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Bookmark className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Share2 className="h-4 w-4" /></Button>
                            </div>
                          </div>
                          <div className="telugu-text text-xl md:text-2xl leading-[1.8] text-foreground/90 bg-accent/5 p-6 md:p-8 rounded-2xl border-2 border-accent/10">
                            {renderFormattedText(item.content || '', item.id)}
                          </div>
                        </div>
                      )}

                      {/* Bible Verses Display */}
                      {(showAllFootnotes || (item.scripture && item.scripture.length > 0)) && (
                        <div className={cn(
                          "mt-8 pl-5 space-y-4 transition-all duration-500",
                          !showAllFootnotes && "hidden"
                        )}>
                          <Separator className="opacity-50 h-0.5" />
                          <div className="animate-in slide-in-from-top-2 duration-300">
                            <p className="text-[10px] uppercase font-bold text-primary mb-4 telugu-text tracking-widest opacity-70 flex items-center gap-2">
                              <BookOpenCheck className="w-3 h-3" /> లేఖన ఆధారాలు (Bible Verses)
                            </p>
                            <ul className="grid gap-4">
                              {item.scripture?.map((ref, i) => {
                                const refMatch = ref.match(/^(\d+)/);
                                const refId = refMatch ? refMatch[1] : (i + 1).toString();
                                
                                return (
                                  <li 
                                    key={i} 
                                    id={`ref-${item.id}-${refId}`}
                                    className="telugu-text text-base md:text-lg text-foreground/80 flex gap-3 p-4 rounded-xl transition-all duration-500 border border-border/50 bg-muted/20 hover:border-primary/30"
                                  >
                                    <span className="font-bold text-primary shrink-0 opacity-70 bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center text-xs">
                                      {refId}
                                    </span>
                                    <span className="leading-relaxed">{ref}</span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {section.insights && section.insights.length > 0 && (
                    <div className="mt-12 p-6 bg-primary/5 rounded-2xl border-2 border-primary/10 shadow-inner">
                      <h3 className="telugu-heading text-xl mb-4 flex items-center gap-3">
                        <Lightbulb className="w-5 h-5 text-primary" />
                        ముఖ్యమైన అంశాలు
                      </h3>
                      <ul className="space-y-3">
                        {section.insights.map((insight, idx) => (
                          <li key={idx} className="telugu-text text-lg flex gap-3">
                            <span className="text-primary font-bold">•</span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Side Panel for Footnotes */}
      <Sheet open={!!selectedFootnote} onOpenChange={(open) => !open && setSelectedFootnote(null)}>
        <SheetContent side="right" className="sm:max-w-md bg-card border-l-4 border-primary/20 p-0 overflow-hidden">
          <div className="flex flex-col h-full">
            <SheetHeader className="p-6 bg-primary/5 border-b">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {selectedFootnote?.refNum}
                </div>
                <SheetTitle className="telugu-heading text-2xl font-bold text-primary">లేఖన ఆధారము</SheetTitle>
              </div>
              <SheetDescription className="telugu-text text-sm">
                ఈ విభాగం యొక్క బైబిలు రిఫరెన్స్ ఇక్కడ ఉంది.
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-8 bg-background">
              <div className="telugu-text text-xl md:text-2xl leading-relaxed text-foreground/90 italic p-6 rounded-2xl bg-accent/5 border-2 border-dashed border-accent/20">
                "{selectedFootnote?.content}"
              </div>
              <div className="mt-12 text-center">
                <Button variant="outline" className="telugu-text rounded-full" onClick={() => setSelectedFootnote(null)}>
                  మూసివేయి (Close)
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
