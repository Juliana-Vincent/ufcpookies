import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    # Set 16:9 widescreen
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    
    # Colors (Dark Theme matching the UFC Fanpage "the pookies")
    bg_color = RGBColor(9, 9, 11)          # Zinc 950 (Nearly black)
    card_bg = RGBColor(24, 24, 27)         # Zinc 900 (Dark gray cards)
    title_color = RGBColor(255, 255, 255)  # White
    text_color = RGBColor(161, 161, 170)   # Zinc 400 (Light gray body text)
    accent_color = RGBColor(220, 38, 38)   # Red 600 (UFC Red)
    accent_teal = RGBColor(20, 184, 166)   # Teal 500
    
    blank_layout = prs.slide_layouts[6] # completely blank slide
    
    # ==================== Slide 1: Title Slide ====================
    slide1 = prs.slides.add_slide(blank_layout)
    fill = slide1.background.fill
    fill.solid()
    fill.fore_color.rgb = bg_color
    
    # Left accent bar (UFC Red)
    bar = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(0.4), Inches(7.5))
    bar.fill.solid()
    bar.fill.fore_color.rgb = accent_color
    bar.line.fill.background()
    
    # Title Text Frame
    title_box = slide1.shapes.add_textbox(Inches(1.5), Inches(2.0), Inches(10.5), Inches(4.0))
    tf = title_box.text_frame
    tf.word_wrap = True
    
    p = tf.paragraphs[0]
    p.text = "UFC Fanpage — the pookies"
    p.font.name = "Segoe UI"
    p.font.size = Pt(56)
    p.font.bold = True
    p.font.italic = True
    p.font.color.rgb = RGBColor(255, 255, 255)
    
    p2 = tf.add_paragraph()
    p2.text = "Maturitní projekt — Webové aplikace v Next.js a Supabase"
    p2.font.name = "Segoe UI"
    p2.font.size = Pt(24)
    p2.font.color.rgb = text_color
    p2.space_before = Pt(10)
    
    p3 = tf.add_paragraph()
    p3.text = "\nPrezentuje: Vincent\nTřída: 4.IT\nŠkolní rok: 2025/2026"
    p3.font.name = "Segoe UI"
    p3.font.size = Pt(16)
    p3.font.color.rgb = text_color
    p3.space_before = Pt(40)
    
    # Helper function to create content slides with header styling
    def add_custom_slide(title_text):
        slide = prs.slides.add_slide(blank_layout)
        fill = slide.background.fill
        fill.solid()
        fill.fore_color.rgb = bg_color
        
        # Header vertical accent bar (Red)
        header_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(0.5), Inches(0.08), Inches(0.8))
        header_bar.fill.solid()
        header_bar.fill.fore_color.rgb = accent_color
        header_bar.line.fill.background()
        
        # Title
        tb = slide.shapes.add_textbox(Inches(1.0), Inches(0.4), Inches(11.5), Inches(1.0))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title_text
        p.font.name = "Segoe UI"
        p.font.size = Pt(36)
        p.font.bold = True
        p.font.italic = True
        p.font.color.rgb = title_color
        return slide
    
    # ==================== Slide 2: Cíl a motivace ====================
    slide2 = add_custom_slide("Cíl a motivace projektu")
    content_box2 = slide2.shapes.add_textbox(Inches(0.8), Inches(1.8), Inches(11.7), Inches(5.0))
    tf2 = content_box2.text_frame
    tf2.word_wrap = True
    
    bullets2 = [
        ("Komunitní portál:", "Vytvoření interaktivního a vysoce moderního webu pro fanoušky smíšených bojových umění (MMA/UFC)."),
        ("Rychlé a živé UI:", "Implementace snap-scrolling navigace (sekce po vzoru prezentace) a animací pro vyvolání pocitu dynamiky."),
        ("Správa obsahu přes DB:", "Propojení s cloudovou SQL databází, která spravuje profily zápasníků a chystané fight-karty."),
        ("Moderní webové technologie:", "Osvojení si vývoje v Next.js (App Router), TypeScriptu a integrace databázového řešení Supabase.")
    ]
    for i, (title, desc) in enumerate(bullets2):
        p = tf2.paragraphs[0] if i == 0 else tf2.add_paragraph()
        p.space_after = Pt(20)
        
        run_title = p.add_run()
        run_title.text = "•  " + title + " "
        run_title.font.name = "Segoe UI"
        run_title.font.size = Pt(20)
        run_title.font.bold = True
        run_title.font.color.rgb = accent_color
        
        run_desc = p.add_run()
        run_desc.text = desc
        run_desc.font.name = "Segoe UI"
        run_desc.font.size = Pt(20)
        run_desc.font.color.rgb = text_color

    # ==================== Slide 3: Použité technologie ====================
    slide3 = add_custom_slide("Použité technologie")
    techs = [
        ("Next.js (React 19)", "React framework s podporou SSR (Server-Side Rendering), optimalizace a App Routeru pro čistou strukturu stránek."),
        ("Supabase (PostgreSQL)", "BaaS platforma poskytující hostovanou SQL databázi, rychlé API rozhraní a snadnou správu dat (bojovníci, zápasy)."),
        ("TailwindCSS v4", "Moderní utility-first CSS framework pro rychlý a responsivní styling přímo v HTML/TSX souborech bez psaní klasického CSS."),
        ("Framer Motion & TypeScript", "Knihovna pro plynulé a hardwarově akcelerované webové animace v kombinaci s typově bezpečným TypeScriptem.")
    ]
    
    card_w = Inches(5.6)
    card_h = Inches(2.2)
    positions = [
        (Inches(0.8), Inches(1.8)),
        (Inches(6.9), Inches(1.8)),
        (Inches(0.8), Inches(4.5)),
        (Inches(6.9), Inches(4.5))
    ]
    
    for i, (tech_title, tech_desc) in enumerate(techs):
        x, y = positions[i]
        card = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, card_w, card_h)
        card.fill.solid()
        card.fill.fore_color.rgb = card_bg
        card.line.color.rgb = RGBColor(63, 63, 70) # Zinc 700
        card.line.width = Pt(1)
        
        tb = slide3.shapes.add_textbox(x + Inches(0.25), y + Inches(0.2), card_w - Inches(0.5), card_h - Inches(0.4))
        tf = tb.text_frame
        tf.word_wrap = True
        
        p = tf.paragraphs[0]
        p.text = tech_title
        p.font.name = "Segoe UI"
        p.font.size = Pt(20)
        p.font.bold = True
        p.font.color.rgb = RGBColor(255, 255, 255)
        
        p2 = tf.add_paragraph()
        p2.text = tech_desc
        p2.font.name = "Segoe UI"
        p2.font.size = Pt(14)
        p2.font.color.rgb = text_color
        p2.space_before = Pt(8)

    # ==================== Slide 4: Uživatelské rozhraní a design ====================
    slide4 = add_custom_slide("Uživatelské rozhraní (UI) & UX")
    content_box4 = slide4.shapes.add_textbox(Inches(0.8), Inches(1.8), Inches(11.7), Inches(5.0))
    tf4 = content_box4.text_frame
    tf4.word_wrap = True
    
    bullets4 = [
        ("Snap-scrolling navigace:", "Hlavní stránka využívá efekt celoobrazovkového posouvání (`snap-y snap-mandatory`), což dodává webu herní a prezentovatelnou podobu."),
        ("Featured Roster:", "Horizontální posuvný přehled bojovníků s interaktivními kartami zobrazujícími přezdívku, váhovou kategorii a fotografii."),
        ("Interaktivní modál zápasu:", "Po kliknutí na detail zápasu v sekci 'Upcoming Must Watch' se otevře plynulé modální okno s porovnáním obou bojovníků."),
        ("Temný agresivní režim:", "Využití tmavého pozadí v kombinaci s agresivní červenou barvou odkazuje přímo na identitu a atmosféru zápasů v kleci UFC.")
    ]
    
    for i, (title, desc) in enumerate(bullets4):
        p = tf4.paragraphs[0] if i == 0 else tf4.add_paragraph()
        p.space_after = Pt(16)
        
        run_title = p.add_run()
        run_title.text = "•  " + title + " "
        run_title.font.name = "Segoe UI"
        run_title.font.size = Pt(18)
        run_title.font.bold = True
        run_title.font.color.rgb = accent_color
        
        run_desc = p.add_run()
        run_desc.text = desc
        run_desc.font.name = "Segoe UI"
        run_desc.font.size = Pt(18)
        run_desc.font.color.rgb = text_color

    # ==================== Slide 5: Databáze a Supabase integrace ====================
    slide5 = add_custom_slide("Backend, Databáze & Supabase")
    # Split layout: Left for bullet points, Right for DB schema
    tb_left5 = slide5.shapes.add_textbox(Inches(0.8), Inches(1.8), Inches(6.0), Inches(5.0))
    tf_left5 = tb_left5.text_frame
    tf_left5.word_wrap = True
    
    bullets5 = [
        ("1. Rychlé BaaS řešení:", "Supabase zastupuje backend bez nutnosti psát Node.js/Express API. Poskytuje zabezpečené PostgreSQL úložiště."),
        ("2. Bezpečné připojení:", "Inicializace klienta přes environmentální proměnné v .env.local (`NEXT_PUBLIC_SUPABASE_URL`), které jsou skryté před klientem."),
        ("3. Komunikace (fetchování):", "Využití JS SDK klienta pro asynchronní dotazy typu `supabase.from('fighters').select('*').eq('isPublished', true)`."),
        ("4. Real-time stavy:", "Data se načítají asynchronně na klientovi za použití hooků useEffect a useState s indikací loading stavu.")
    ]
    
    for i, (title, desc) in enumerate(bullets5):
        p = tf_left5.paragraphs[0] if i == 0 else tf_left5.add_paragraph()
        p.space_after = Pt(12)
        
        run_title = p.add_run()
        run_title.text = title + "\n"
        run_title.font.name = "Segoe UI"
        run_title.font.size = Pt(16)
        run_title.font.bold = True
        run_title.font.color.rgb = title_color
        
        run_desc = p.add_run()
        run_desc.text = desc
        run_desc.font.name = "Segoe UI"
        run_desc.font.size = Pt(14)
        run_desc.font.color.rgb = text_color
        
    # Database representation card
    db_card = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.2), Inches(1.8), Inches(5.3), Inches(4.8))
    db_card.fill.solid()
    db_card.fill.fore_color.rgb = card_bg
    db_card.line.color.rgb = RGBColor(63, 63, 70)
    db_card.line.width = Pt(1)
    
    tb_db = slide5.shapes.add_textbox(Inches(7.4), Inches(2.0), Inches(4.9), Inches(4.4))
    tf_db = tb_db.text_frame
    tf_db.word_wrap = True
    
    p_db = tf_db.paragraphs[0]
    p_db.text = "Databázové schéma (PostgreSQL)"
    p_db.font.name = "Segoe UI"
    p_db.font.size = Pt(18)
    p_db.font.bold = True
    p_db.font.color.rgb = accent_color
    
    p_db_c = tf_db.add_paragraph()
    p_db_c.text = (
        "\n• Tabulka: fighters\n"
        "  - id (UUID, Primary Key)\n"
        "  - name, nickname, weight_class (text)\n"
        "  - record, height, reach (text)\n"
        "  - image_url (text)\n"
        "  - slug (text, url safe)\n"
        "  - interesting_facts (text[])\n"
        "  - isPublished (boolean)\n\n"
        "• Tabulka: upcoming_fights\n"
        "  - id (UUID)\n"
        "  - ufc_number (integer)\n"
        "  - fighter_1_name, fighter_2_name (text)\n"
        "  - is_upcoming (boolean)"
    )
    p_db_c.font.name = "Consolas"
    p_db_c.font.size = Pt(12)
    p_db_c.font.color.rgb = text_color

    # ==================== Slide 6: Animace a optimalizace ====================
    slide6 = add_custom_slide("Animace & Optimalizace")
    content_box6 = slide6.shapes.add_textbox(Inches(0.8), Inches(1.8), Inches(11.7), Inches(5.0))
    tf6 = content_box6.text_frame
    tf6.word_wrap = True
    
    bullets6 = [
        ("Framer Motion Knihovna:", "Použita k vytvoření plynulých náběhů. Např. u nadpisu 'THE POOKIES' na úvodní sekci, který se při načtení jemně zvětší z 0.8 na 1 a zprůhlední (opacity 0 -> 1)."),
        ("Interaktivita karet:", "Při najetí myší (hover) na karty bojovníků dochází ke zvětšení měřítka, což poskytuje uživateli hmatatelnou zpětnou vazbu o interakci."),
        ("Next.js optimalizace obrázků:", "Použití knihovny 'sharp' pro automatické komprimování a konverzi obrázků bojovníků do úsporného formátu WebP v reálném čase, což snižuje přenos dat."),
        ("Client Component ('use client'):", "Použito na stránkách s interaktivním stavem (např. otevírání detailu zápasu), což umožňuje spouštět JavaScript na straně prohlížeče.")
    ]
    
    for i, (title, desc) in enumerate(bullets6):
        p = tf6.paragraphs[0] if i == 0 else tf6.add_paragraph()
        p.space_after = Pt(16)
        
        run_title = p.add_run()
        run_title.text = "•  " + title + " "
        run_title.font.name = "Segoe UI"
        run_title.font.size = Pt(18)
        run_title.font.bold = True
        run_title.font.color.rgb = accent_color
        
        run_desc = p.add_run()
        run_desc.text = desc
        run_desc.font.name = "Segoe UI"
        run_desc.font.size = Pt(18)
        run_desc.font.color.rgb = text_color

    # ==================== Slide 7: Budoucí rozvoj a zhodnocení ====================
    slide7 = add_custom_slide("Budoucí rozvoj & Rozšíření")
    content_box7 = slide7.shapes.add_textbox(Inches(0.8), Inches(1.8), Inches(11.7), Inches(5.0))
    tf7 = content_box7.text_frame
    tf7.word_wrap = True
    
    bullets7 = [
        ("Uživatelská registrace (Auth):", "Využití vestavěného ověřování v Supabase (OAuth / Email) pro přihlášení uživatelů a možnost vytváření vlastních seznamů oblíbených bojovníků."),
        ("Tipování zápasů (Betting Simulator):", "Vytvoření zábavného simulátoru, kde by registrovaní fanoušci mohli tipovat vítěze nadcházejících zápasů a sbírat body."),
        ("Napojení na oficiální UFC API:", "Nahrazení statického plnění tabulky zápasů automatickým skriptem, který by v reálném čase stahoval oficiální fight-karty."),
        ("Diskuzní fórum pod zápasy:", "Implementace komentářové sekce pro reálnou komunikaci mezi komunitou fanoušků v reálném čase.")
    ]
    
    for i, (title, desc) in enumerate(bullets7):
        p = tf7.paragraphs[0] if i == 0 else tf7.add_paragraph()
        p.space_after = Pt(16)
        
        run_title = p.add_run()
        run_title.text = "•  " + title + " "
        run_title.font.name = "Segoe UI"
        run_title.font.size = Pt(18)
        run_title.font.bold = True
        run_title.font.color.rgb = accent_teal
        
        run_desc = p.add_run()
        run_desc.text = desc
        run_desc.font.name = "Segoe UI"
        run_desc.font.size = Pt(18)
        run_desc.font.color.rgb = text_color

    # ==================== Slide 8: Závěr & Otázky ====================
    slide8 = prs.slides.add_slide(blank_layout)
    fill8 = slide8.background.fill
    fill8.solid()
    fill8.fore_color.rgb = bg_color
    
    bar8 = slide8.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(0.4), Inches(7.5))
    bar8.fill.solid()
    bar8.fill.fore_color.rgb = accent_color
    bar8.line.fill.background()
    
    tb8 = slide8.shapes.add_textbox(Inches(1.5), Inches(2.0), Inches(10.5), Inches(4.0))
    tf8 = tb8.text_frame
    tf8.word_wrap = True
    
    p = tf8.paragraphs[0]
    p.text = "Děkuji za pozornost"
    p.font.name = "Segoe UI"
    p.font.size = Pt(56)
    p.font.bold = True
    p.font.color.rgb = RGBColor(255, 255, 255)
    
    p2 = tf8.add_paragraph()
    p2.text = "Prostor pro vaše dotazy a diskuzi."
    p2.font.name = "Segoe UI"
    p2.font.size = Pt(28)
    p2.font.color.rgb = text_color
    p2.space_before = Pt(20)
    
    p3 = tf8.add_paragraph()
    p3.text = "\n\nAutor: Vincent\nTéma: UFC Fanpage (Next.js, Supabase, Tailwind)"
    p3.font.name = "Segoe UI"
    p3.font.size = Pt(16)
    p3.font.color.rgb = text_color
    p3.space_before = Pt(40)
    
    prs.save("/Users/vincent/ufc-fanpage/Prezentace_UFC_Fanpage.pptx")
    print("UFC Presentation created successfully.")

if __name__ == "__main__":
    create_presentation()
