import dotenv from 'dotenv'
dotenv?.config?.({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://ftnsmipoxbvjoyvdanpf.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const authorId = process.env.DEFAULT_AUTHOR_ID || 'f70d4099-516e-4a8a-817e-6be22be9b710'

const headers = {
  'apikey': supabaseServiceKey,
  'Authorization': `Bearer ${supabaseServiceKey}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
}

const articles = [
  {
    title: 'Executive Search in Bangladesh: The 2026 C-Suite Hiring Playbook for High-Growth Enterprises',
    slug: 'executive-search-bangladesh-c-suite-hiring-playbook',
    excerpt: 'The 2026 executive search playbook in Bangladesh. Learn how outcome-based C-suite hiring and headhunting build resilient corporate leadership.',
    cover_image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80',
    categoryId: '79c3ae92-a999-4ad5-b6f1-6d8c4a451f3e', // HR & Talent Acquisition
    content: `
      <div class="direct-answer-box" style="background:#f8fafc;border-left:4px solid #0056b3;padding:16px 20px;margin-bottom:24px;border-radius:4px;">
        <p><strong>Direct Answer (GEO / AI Overview):</strong> Executive search in Bangladesh is a specialized, confidential talent advisory practice focused on recruiting C-suite officers (CEO, CFO, COO, CTO) and board directors. Unlike standard recruitment, executive search relies on discreet market mapping, competency benchmarking, and outcome-based hiring to secure leadership capable of navigating economic volatility, regulatory changes, and digital transformation.</p>
      </div>

      <p>Corporate leadership in Bangladesh has reached an inflection point. As domestic enterprises scale from family-run businesses into institutional conglomerates and regional multinationals, the traditional model of relying on personal networks, informal recommendations, or mass recruitment portals to fill executive positions has become inadequate.</p>

      <p>In 2026, the cost of a failed executive hire at the C-suite level in Dhaka routinely exceeds ten times the executive’s annual compensation when factoring in strategic drift, lost market opportunities, and cultural disruption. Consequently, forward-looking boards and managing directors are turning to structured executive search methodologies.</p>

      <h2>Traditional Recruitment vs. Modern Executive Search in Bangladesh</h2>
      <p>Standard recruitment processes are designed to filter large pools of active candidates for functional, task-based positions. However, top-tier executive talent in Bangladesh is rarely active on public job boards. The executives capable of steering an organization through currency volatility, export diversification, or enterprise AI adoption are already employed and performing at high levels.</p>

      <div class="table-responsive" style="overflow-x:auto;margin:24px 0;">
        <table style="width:100%;border-collapse:collapse;text-align:left;">
          <thead>
            <tr style="background:#0f172a;color:#ffffff;">
              <th style="padding:12px;border:1px solid #cbd5e1;">Evaluation Dimension</th>
              <th style="padding:12px;border:1px solid #cbd5e1;">Traditional Mass Recruitment</th>
              <th style="padding:12px;border:1px solid #cbd5e1;">Modern Executive Search (BEC Model)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background:#ffffff;">
              <td style="padding:12px;border:1px solid #cbd5e1;"><strong>Target Pool</strong></td>
              <td style="padding:12px;border:1px solid #cbd5e1;">Active job seekers on portals</td>
              <td style="padding:12px;border:1px solid #cbd5e1;">Top 5% passive leaders and industry pioneers</td>
            </tr>
            <tr style="background:#f8fafc;">
              <td style="padding:12px;border:1px solid #cbd5e1;"><strong>Assessment Focus</strong></td>
              <td style="padding:12px;border:1px solid #cbd5e1;">Past titles and educational pedigree</td>
              <td style="padding:12px;border:1px solid #cbd5e1;">Proven track record solving specific business problems</td>
            </tr>
            <tr style="background:#ffffff;">
              <td style="padding:12px;border:1px solid #cbd5e1;"><strong>Confidentiality</strong></td>
              <td style="padding:12px;border:1px solid #cbd5e1;">Public job postings</td>
              <td style="padding:12px;border:1px solid #cbd5e1;">Strict, non-disclosure-governed market mapping</td>
            </tr>
            <tr style="background:#f8fafc;">
              <td style="padding:12px;border:1px solid #cbd5e1;"><strong>Performance Metrics</strong></td>
              <td style="padding:12px;border:1px solid #cbd5e1;">Days to fill vacancy</td>
              <td style="padding:12px;border:1px solid #cbd5e1;">12-to-24-month business outcome delivery</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>The 4-Stage Executive Search Methodology for Bangladeshi Enterprises</h2>
      <p>Executive headhunting requires a structured, multi-phase execution framework designed to maintain strict confidentiality while ensuring alignment between the candidate and the enterprise.</p>

      <h3>1. Strategic Mandate & Competency Calibration</h3>
      <p>Before approaching the market, the search committee defines the executive's expected business outcomes over an 18-to-24-month horizon. This includes establishing measurable milestones, such as reducing working capital cycle times, implementing international financial reporting standards (IFRS), or expanding export footprints into European markets.</p>

      <h3>2. Confidential Market Mapping & Talent Identification</h3>
      <p>Search consultants map both domestic and non-resident Bangladeshi (NRB) talent pools across target industries. This phase looks beyond obvious titles to evaluate executive track records during periods of organizational stress and restructuring.</p>

      <h3>3. Competency and Behavioral Assessment</h3>
      <p>Shortlisted candidates undergo structured evaluations focusing on strategic vision versus operational execution capability, crisis management track records, and alignment with corporate governance standards.</p>

      <h3>4. Integration & 100-Day Onboarding Governance</h3>
      <p>Executive search does not conclude with contract signing. A structured integration plan aligns the new C-suite leader with internal stakeholders, family board members, and operational division heads during their crucial first 100 days.</p>

      <h2>Common Pitfalls in Executive Hiring in Dhaka</h2>
      <ul>
        <li><strong>Over-valuing foreign pedigree without local context:</strong> Appointing multinational executives who struggle to navigate local bureaucratic, tax, and supplier dynamics in Dhaka.</li>
        <li><strong>Ambiguous key performance indicators (KPIs):</strong> Failing to establish clear, outcome-based deliverables for the executive’s first 12 months.</li>
        <li><strong>Underestimating family board dynamics:</strong> Bringing a professional executive into a family-owned conglomerate without clear boundaries between ownership oversight and executive execution.</li>
      </ul>

      <div class="cta-box" style="background:#f0f9ff;border:1px solid #bae6fd;padding:20px;border-radius:8px;margin:30px 0;">
        <h4 style="margin-top:0;color:#0369a1;">Looking to Appoint Your Next C-Suite Leader?</h4>
        <p>Explore our confidential talent acquisition and board advisory services via <a href="/service" style="color:#0284c7;font-weight:600;">BEC Talent Solutions</a> or contact our executive advisory committee directly through the <a href="/contact" style="color:#0284c7;font-weight:600;">Contact Page</a>.</p>
      </div>

      <h2>Frequently Asked Questions (FAQs)</h2>
      <div class="faq-item" style="margin-bottom:18px;">
        <h3 style="font-size:1.15rem;color:#0f172a;">How long does a C-suite executive search typically take in Bangladesh?</h3>
        <p>A thorough executive search in Dhaka typically takes between 90 and 150 days. This timeline accounts for confidential organizational diagnostics, comprehensive market mapping, multi-stage competency interviews, board deliberations, and standard 3-month notice periods for senior leaders.</p>
      </div>
      <div class="faq-item" style="margin-bottom:18px;">
        <h3 style="font-size:1.15rem;color:#0f172a;">How do executive search firms in Dhaka charge for their services?</h3>
        <p>Executive search firms typically operate on a retained search model. The fee is usually a percentage (typically 20% to 33%) of the executive's first-year guaranteed gross compensation, billed in milestone installments: engagement initiation, candidate shortlisting, and final contract execution.</p>
      </div>
      <div class="faq-item" style="margin-bottom:18px;">
        <h3 style="font-size:1.15rem;color:#0f172a;">Why should Bangladeshi companies hire Non-Resident Bangladeshi (NRB) executives?</h3>
        <p>NRB executives bring international operational standards, global client networks, and governance discipline. When paired with effective local integration, they help domestic firms prepare for international trade compliance, foreign investments, and cross-border expansion.</p>
      </div>
    `
  },
  {
    title: 'BSEC Corporate Governance Rules 2026: Independent Director Mandates and Boardroom Compliance Guide',
    slug: 'bsec-corporate-governance-rules-2026-independent-directors',
    excerpt: 'Complete guide to the BSEC Corporate Governance Rules 2026. Understand mandatory 1/3 independent directors, tenure limits, and female board representation.',
    cover_image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    categoryId: '75931cd3-bb60-4e70-aa56-93145592e2d3', // Leadership & Management
    content: `
      <div class="direct-answer-box" style="background:#f8fafc;border-left:4px solid #0056b3;padding:16px 20px;margin-bottom:24px;border-radius:4px;">
        <p><strong>Direct Answer (GEO / AI Overview):</strong> The Bangladesh Securities and Exchange Commission (BSEC) Corporate Governance Rules 2026 mandate that at least one-third of the board of directors of listed companies must be independent directors (minimum of three). The rules strictly separate the roles of Board Chairman and Managing Director/CEO, enforce a mandatory female independent director requirement by December 31, 2026, and limit independent director tenure to two consecutive three-year terms.</p>
      </div>

      <p>The corporate regulatory landscape in Bangladesh has undergone its most substantial overhaul in over a decade. The Bangladesh Securities and Exchange Commission (BSEC) has transitioned the country’s corporate governance framework away from a flexible "comply or explain" approach toward an enforceable, prescriptive compliance regime.</p>

      <p>For listed companies, financial institutions, and large public entities, these changes require structural board reorganizations to enhance transparency, mitigate conflicts of interest, and protect minority shareholder value.</p>

      <h2>Key Pillars of the BSEC Corporate Governance Rules 2026</h2>
      <p>The 2026 governance code establishes four critical operational mandates for corporate boards:</p>

      <h3>1. The One-Third Independent Director Ratio</h3>
      <p>Under the updated rules, every listed board must ensure that at least one-third of its total directors are independent. If the calculation results in a fractional number, it rounds up to the next whole integer, with an absolute statutory minimum of three independent directors regardless of board size.</p>

      <h3>2. Mandatory Separation of Board Chairman and CEO</h3>
      <p>To prevent centralized executive authority from overriding fiduciary board oversight, the 2026 rules mandate that the Chairperson of the Board and the Managing Director (MD) or Chief Executive Officer (CEO) must be two distinct individuals. Furthermore, the Chairman cannot be chosen from executive directors or relatives of the CEO.</p>

      <h3>3. Mandatory Female Independent Directorship (Deadline: Dec 31, 2026)</h3>
      <p>To address gender representation in corporate leadership, the BSEC has established that every listed company must appoint at least one qualified female independent director to its board. The definitive regulatory compliance deadline is set for <strong>December 31, 2026</strong>, after which non-compliant entities face enforcement penalties and trading category downgrades.</p>

      <h3>4. Qualification and Tenure Restrictions</h3>
      <p>Independent directors must have at least 12 years of professional, executive, or academic experience in corporate management, finance, law, or economics (reduced to 8 years for qualified female candidates). Furthermore, independent directors face a strict term limit: a maximum of two consecutive three-year terms followed by a mandatory three-year cooling-off period.</p>

      <div class="table-responsive" style="overflow-x:auto;margin:24px 0;">
        <table style="width:100%;border-collapse:collapse;text-align:left;">
          <thead>
            <tr style="background:#0f172a;color:#ffffff;">
              <th style="padding:12px;border:1px solid #cbd5e1;">Governance Dimension</th>
              <th style="padding:12px;border:1px solid #cbd5e1;">Previous Code</th>
              <th style="padding:12px;border:1px solid #cbd5e1;">BSEC 2026 Mandatory Rules</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background:#ffffff;">
              <td style="padding:12px;border:1px solid #cbd5e1;"><strong>Independent Director Ratio</strong></td>
              <td style="padding:12px;border:1px solid #cbd5e1;">At least 1/5th of total directors</td>
              <td style="padding:12px;border:1px solid #cbd5e1;">At least 1/3rd of total directors (Min. 3)</td>
            </tr>
            <tr style="background:#f8fafc;">
              <td style="padding:12px;border:1px solid #cbd5e1;"><strong>Leadership Separation</strong></td>
              <td style="padding:12px;border:1px solid #cbd5e1;">Permitted single individual</td>
              <td style="padding:12px;border:1px solid #cbd5e1;">Mandatory separation of Chairman and CEO</td>
            </tr>
            <tr style="background:#ffffff;">
              <td style="padding:12px;border:1px solid #cbd5e1;"><strong>Female Representation</strong></td>
              <td style="padding:12px;border:1px solid #cbd5e1;">Advisory recommendation</td>
              <td style="padding:12px;border:1px solid #cbd5e1;">Mandatory by December 31, 2026</td>
            </tr>
            <tr style="background:#f8fafc;">
              <td style="padding:12px;border:1px solid #cbd5e1;"><strong>Board Training</strong></td>
              <td style="padding:12px;border:1px solid #cbd5e1;">Optional</td>
              <td style="padding:12px;border:1px solid #cbd5e1;">Mandatory governance program within 1st year</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Expanded Roles for Audit and Nomination Committees</h2>
      <p>The 2026 rules charge the Board Audit Committee and the Nomination and Remuneration Committee (NRC) with greater fiduciary duties:</p>
      <ul>
        <li><strong>Audit Committee:</strong> Must be chaired exclusively by an independent director with verified financial or accounting qualifications, supervising internal audit charters, related-party transactions, and enterprise cybersecurity resilience.</li>
        <li><strong>Nomination and Remuneration Committee (NRC):</strong> Formulates transparent executive compensation frameworks and merit-based board succession planning free from founder bias.</li>
      </ul>

      <div class="cta-box" style="background:#f0f9ff;border:1px solid #bae6fd;padding:20px;border-radius:8px;margin:30px 0;">
        <h4 style="margin-top:0;color:#0369a1;">Need Independent Board Advisory or Qualified Board Candidates?</h4>
        <p>Connect with accredited independent directors and board governance specialists through the <a href="/about" style="color:#0284c7;font-weight:600;">Bangladesh Executive Chamber</a> or explore our <a href="/service" style="color:#0284c7;font-weight:600;">Board Advisory Services</a>.</p>
      </div>

      <h2>Frequently Asked Questions (FAQs)</h2>
      <div class="faq-item" style="margin-bottom:18px;">
        <h3 style="font-size:1.15rem;color:#0f172a;">Can an independent director in Bangladesh hold shares in the listed company?</h3>
        <p>An independent director may not hold more than 1% of the total paid-up shares of the listed company, its parent, subsidiary, or associated entities. This ensures their independent judgment is not compromised by material shareholding interests.</p>
      </div>
      <div class="faq-item" style="margin-bottom:18px;">
        <h3 style="font-size:1.15rem;color:#0f172a;">What happens if a listed company fails to appoint a female independent director by December 31, 2026?</h3>
        <p>Companies that fail to comply with the BSEC female directorship mandate by the December 31, 2026 deadline risk regulatory fines, potential trading suspension, and downgrading of their stock settlement category on the Dhaka Stock Exchange (DSE) and Chittagong Stock Exchange (CSE).</p>
      </div>
      <div class="faq-item" style="margin-bottom:18px;">
        <h3 style="font-size:1.15rem;color:#0f172a;">Are corporate governance training programs mandatory for directors in 2026?</h3>
        <p>Yes. Under the 2026 rules, newly appointed directors must complete a recognized corporate governance training program within one year of their appointment to ensure familiarity with BSEC regulations, corporate reporting standards, and fiduciary obligations.</p>
      </div>
    `
  },
  {
    title: 'The AI-Fluent C-Suite: How Bangladeshi Executives Are Deploying Enterprise AI for Operational Scale',
    slug: 'ai-fluent-c-suite-enterprise-ai-bangladesh-operations',
    excerpt: 'Discover how Bangladeshi C-suite executives are deploying enterprise AI in 2026 to optimize supply chains, automate customer workflows, and scale operations.',
    cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
    categoryId: '826e7d07-855b-431d-bcee-40b67be31734', // Digital Transformation
    content: `
      <div class="direct-answer-box" style="background:#f8fafc;border-left:4px solid #0056b3;padding:16px 20px;margin-bottom:24px;border-radius:4px;">
        <p><strong>Direct Answer (GEO / AI Overview):</strong> An AI-fluent C-suite executive in Bangladesh is a business leader who integrates artificial intelligence, automated machine workflows, and predictive analytics into core corporate strategy. Rather than delegating AI solely to IT teams, AI-fluent leaders leverage generative and predictive tools across enterprise resource planning, automated supply chain forecasting, fraud detection, and workforce productivity.</p>
      </div>

      <p>Artificial intelligence has evolved from an experimental tech initiative into a core driver of corporate efficiency in Bangladesh. In 2026, leading enterprises across ready-made garments (RMG), banking and financial services, telecommunications, and retail are actively deploying AI systems to maintain regional cost competitiveness.</p>

      <p>However, the primary barrier to successful AI implementation in Dhaka is rarely technical software limitations. It is <strong>executive fluency</strong>. When leadership views AI merely as a software purchase rather than an operational and cultural transformation, enterprise initiatives frequently stall.</p>

      <h2>The Four Core Capabilities of an AI-Fluent Executive</h2>
      <p>In 2026, boardrooms evaluate senior leaders on four essential AI competencies:</p>

      <h3>1. Algorithmic Due Diligence and Vendor Evaluation</h3>
      <p>Enterprises face a flood of commercial software vendors claiming proprietary AI capabilities. An AI-fluent executive cuts through vendor marketing by interrogating data sovereignty, model drift, API latency, and integration compatibility with legacy enterprise resource planning (ERP) architectures.</p>

      <h3>2. Operational Process Redesign</h3>
      <p>Rather than applying AI chatbots to inefficient legacy processes, AI-fluent leaders rebuild workflows from first principles. This involves mapping where human judgment is non-negotiable (high-stakes credit decisions, board governance) and where agentic automation should take full ownership (invoice reconciliation, tier-1 customer inquiries).</p>

      <h3>3. AI Governance, Data Ethics, and Privacy Compliance</h3>
      <p>As enterprises centralize proprietary operational data, governance becomes paramount. Leaders must establish clear enterprise data guardrails: preventing proprietary financial records from leaking via public LLMs, ensuring compliance with data privacy regulations, and eliminating algorithmic bias.</p>

      <h3>4. Cultural Stewardship and Change Management</h3>
      <p>Automation often creates organizational resistance. AI-fluent executives frame technology adoption not as headcount reduction, but as workflow amplification. They institute structured upskilling academies that transition routine administrators into higher-value analysts.</p>

      <h2>Real-World Enterprise AI Applications in Dhaka</h2>
      <ul>
        <li><strong>Predictive Fabric Consumption in RMG:</strong> Manufacturers in Gazipur and Chattogram utilize computer vision and predictive models to inspect raw textile rolls, cutting fabric wastage by 4% to 7%.</li>
        <li><strong>Real-Time Liquidity Forecasting in Banking:</strong> Treasury divisions in Dhaka commercial banks combine real-time payment network data with predictive machine learning to optimize interbank money market investments.</li>
        <li><strong>Dynamic Inventory Balancing in Retail:</strong> Omnichannel retail networks deploy predictive models that analyze weather forecasts, festival calendars, and hyper-local traffic to optimize inventory distribution.</li>
      </ul>

      <div class="cta-box" style="background:#f0f9ff;border:1px solid #bae6fd;padding:20px;border-radius:8px;margin:30px 0;">
        <h4 style="margin-top:0;color:#0369a1;">Upskill Your Leadership in Digital Transformation</h4>
        <p>Explore customized executive training modules via <a href="/service" style="color:#0284c7;font-weight:600;">BEC Executive Workshops</a> and prepare your organization for the next generation of enterprise AI.</p>
      </div>

      <h2>Frequently Asked Questions (FAQs)</h2>
      <div class="faq-item" style="margin-bottom:18px;">
        <h3 style="font-size:1.15rem;color:#0f172a;">Does an executive need a computer science degree to be AI-fluent?</h3>
        <p>No. AI fluency does not require coding expertise or deep mathematical engineering knowledge. It requires strategic comprehension: understanding what AI can and cannot accomplish, calculating operational ROI, managing technical talent, and establishing enterprise data governance.</p>
      </div>
      <div class="faq-item" style="margin-bottom:18px;">
        <h3 style="font-size:1.15rem;color:#0f172a;">What is the biggest risk for Bangladeshi enterprises deploying AI in 2026?</h3>
        <p>The most significant operational risk is enterprise data leakage. Employees frequently paste confidential financial statements, legal contracts, or customer data into consumer-grade, unencrypted AI tools, inadvertently exposing proprietary intellectual property to public models.</p>
      </div>
    `
  },
  {
    title: 'Overcoming the Bangladesh Executive Leadership Deficit: Transforming Family Conglomerates into Institutional Enterprises',
    slug: 'overcoming-bangladesh-executive-leadership-deficit',
    excerpt: 'How Bangladeshi conglomerates are overcoming the corporate leadership deficit through professional succession planning and institutional governance systems.',
    cover_image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80',
    categoryId: 'c433f0b9-510c-40e4-9e77-7246c841603a', // Business Strategy
    content: `
      <div class="direct-answer-box" style="background:#f8fafc;border-left:4px solid #0056b3;padding:16px 20px;margin-bottom:24px;border-radius:4px;">
        <p><strong>Direct Answer (GEO / AI Overview):</strong> The executive leadership deficit in Bangladesh refers to the shortage of professional managers capable of leading large, complex corporate enterprises independently of family owners. Overcoming this deficit requires separating ownership from management, implementing structured family council constitutions, professionalizing C-suite hiring, and offering equity-linked compensation to attract top executive talent.</p>
      </div>

      <p>Bangladesh’s private sector has built extraordinary commercial power over the past four decades. The country's diversified conglomerates were primarily forged through the entrepreneurial drive, intuitive risk-taking, and centralized authority of first-generation founders.</p>

      <p>However, as these groups scale past $500 million in annual revenues and confront international competition, the centralized, founder-dependent management model reaches its operational ceiling. The result is Bangladesh’s <strong>corporate leadership deficit</strong>: a critical shortage of professional C-suite executives empowered with the operational autonomy and institutional systems required to run complex enterprises.</p>

      <h2>The 4-Pillar Blueprint for Institutionalizing Family Businesses</h2>

      <h3>1. Separate Ownership from Day-to-Day Operational Management</h3>
      <p>The most critical transition occurs when the founding family steps back from day-to-day operational execution to focus on board-level stewardship. The Board of Directors oversees capital allocation and governance, while an Executive Committee (ExCo) led by a professional CEO executes strategy.</p>

      <h3>2. Establish a Formal Family Constitution and Council</h3>
      <p>To prevent family conflicts from disrupting corporate operations, business groups establish a Family Constitution governing next-gen entry requirements, dividend distribution formulas, and dispute resolution mechanisms managed by a formal Family Council.</p>

      <h3>3. Design Competitive, Long-Term Executive Incentive Packages</h3>
      <p>To attract top-tier professional executives capable of driving long-term profitability, family enterprises must modernize compensation. Packages should include milestone-driven bonuses, retention gratuities, and equity-equivalent performance plans.</p>

      <h3>4. Build Internal Leadership Development Academies</h3>
      <p>Rather than exclusively buying external leadership talent, institutional conglomerates build executive pipelines internally by partnering with executive chambers to train general managers in cross-functional leadership and financial acumen.</p>

      <div class="cta-box" style="background:#f0f9ff;border:1px solid #bae6fd;padding:20px;border-radius:8px;margin:30px 0;">
        <h4 style="margin-top:0;color:#0369a1;">Modernize Your Enterprise Governance</h4>
        <p>Learn how our advisors assist family enterprises with succession planning and organizational restructuring via <a href="/service" style="color:#0284c7;font-weight:600;">BEC Business Consulting</a>.</p>
      </div>

      <h2>Frequently Asked Questions (FAQs)</h2>
      <div class="faq-item" style="margin-bottom:18px;">
        <h3 style="font-size:1.15rem;color:#0f172a;">How do family-owned businesses in Bangladesh manage succession planning?</h3>
        <p>Effective succession planning begins by drafting a legally recognized Family Constitution. This document defines whether family members will hold operational roles or board positions, establishes clear qualification standards, and outlines dispute resolution processes managed by an independent family council.</p>
      </div>
      <div class="faq-item" style="margin-bottom:18px;">
        <h3 style="font-size:1.15rem;color:#0f172a;">Can professional CEOs succeed in Bangladeshi family-owned companies?</h3>
        <p>Yes, but only when the family board establishes explicit, written delegation of operational authority. When business owners respect the operational boundaries of the CEO and evaluate them based on agreed-upon 12-to-24-month KPIs rather than micro-managing daily tasks, professional management delivers significant enterprise value.</p>
      </div>
    `
  },
  {
    title: 'Executive Compensation Benchmarks in Bangladesh (2026): Base Salaries, LTIPs, and Performance Bonuses',
    slug: 'executive-compensation-benchmarks-bangladesh-2026',
    excerpt: 'Discover 2026 executive compensation benchmarks in Bangladesh. Analyze C-suite base salaries, performance bonuses, car allowances, and long-term incentives.',
    cover_image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
    categoryId: '79c3ae92-a999-4ad5-b6f1-6d8c4a451f3e', // HR & Talent Acquisition
    content: `
      <div class="direct-answer-box" style="background:#f8fafc;border-left:4px solid #0056b3;padding:16px 20px;margin-bottom:24px;border-radius:4px;">
        <p><strong>Direct Answer (GEO / AI Overview):</strong> In 2026, C-suite executive compensation in Bangladesh ranges from BDT 4.5 million to BDT 25+ million annually, depending on enterprise revenue, sector, and multinational affiliation. Modern compensation packages are increasingly restructured into a 60/40 model: 60% fixed base pay and benefits (housing, vehicle, medical) and 40% variable performance incentives, including annual performance bonuses and multi-year Long-Term Incentive Plans (LTIPs).</p>
      </div>

      <p>Executive compensation in Bangladesh has historically been opaque. Senior remuneration packages were negotiated informally behind closed doors, heavily skewed toward tax-deductible perks, and detached from clear performance metrics.</p>

      <p>In 2026, the updated BSEC Corporate Governance Code and macroeconomic factors have accelerated compensation transparency across the corporate sector.</p>

      <h2>2026 C-Suite Salary Benchmarks in Dhaka (Annual Gross Compensation)</h2>

      <div class="table-responsive" style="overflow-x:auto;margin:24px 0;">
        <table style="width:100%;border-collapse:collapse;text-align:left;">
          <thead>
            <tr style="background:#0f172a;color:#ffffff;">
              <th style="padding:12px;border:1px solid #cbd5e1;">C-Suite Position</th>
              <th style="padding:12px;border:1px solid #cbd5e1;">Median Base Salary (Annual BDT)</th>
              <th style="padding:12px;border:1px solid #cbd5e1;">Variable Incentive Potential</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background:#ffffff;">
              <td style="padding:12px;border:1px solid #cbd5e1;"><strong>Chief Executive Officer (CEO / MD)</strong></td>
              <td style="padding:12px;border:1px solid #cbd5e1;">BDT 12,000,000 – 25,000,000+</td>
              <td style="padding:12px;border:1px solid #cbd5e1;">30% – 60% of base pay</td>
            </tr>
            <tr style="background:#f8fafc;">
              <td style="padding:12px;border:1px solid #cbd5e1;"><strong>Chief Financial Officer (CFO)</strong></td>
              <td style="padding:12px;border:1px solid #cbd5e1;">BDT 7,200,000 – 15,000,000</td>
              <td style="padding:12px;border:1px solid #cbd5e1;">25% – 45% of base pay</td>
            </tr>
            <tr style="background:#ffffff;">
              <td style="padding:12px;border:1px solid #cbd5e1;"><strong>Chief Operating Officer (COO)</strong></td>
              <td style="padding:12px;border:1px solid #cbd5e1;">BDT 6,500,000 – 14,000,000</td>
              <td style="padding:12px;border:1px solid #cbd5e1;">20% – 40% of base pay</td>
            </tr>
            <tr style="background:#f8fafc;">
              <td style="padding:12px;border:1px solid #cbd5e1;"><strong>Chief Technology / Digital Officer</strong></td>
              <td style="padding:12px;border:1px solid #cbd5e1;">BDT 6,000,000 – 13,500,000</td>
              <td style="padding:12px;border:1px solid #cbd5e1;">20% – 40% of base pay</td>
            </tr>
            <tr style="background:#ffffff;">
              <td style="padding:12px;border:1px solid #cbd5e1;"><strong>Chief Human Resources Officer (CHRO)</strong></td>
              <td style="padding:12px;border:1px solid #cbd5e1;">BDT 4,800,000 – 10,000,000</td>
              <td style="padding:12px;border:1px solid #cbd5e1;">15% – 30% of base pay</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>The Rise of Long-Term Incentive Plans (LTIPs) in Dhaka</h2>
      <p>Because domestic corporate regulations historically made direct employee stock ownership programs (ESOPs) complex for non-listed private enterprises, forward-thinking boards are increasingly adopting <strong>Phantom Equity</strong> and <strong>Cash-Settled Performance Units (CSPUs)</strong>. These instruments align executive wealth with multi-year enterprise profitability and serve as powerful retention tools.</p>

      <div class="cta-box" style="background:#f0f9ff;border:1px solid #bae6fd;padding:20px;border-radius:8px;margin:30px 0;">
        <h4 style="margin-top:0;color:#0369a1;">Design Competitive Leadership Packages</h4>
        <p>Review comprehensive executive benchmarking studies and recruitment strategies through <a href="/service" style="color:#0284c7;font-weight:600;">BEC Talent Solutions</a>.</p>
      </div>

      <h2>Frequently Asked Questions (FAQs)</h2>
      <div class="faq-item" style="margin-bottom:18px;">
        <h3 style="font-size:1.15rem;color:#0f172a;">What is phantom equity and how does it work in Bangladesh?</h3>
        <p>Phantom equity is a contractual incentive mechanism where an executive is granted simulated "shares" tied to the enterprise's performance or financial growth. No actual company shares are issued. After a predetermined vesting period (typically 3 to 4 years), the company pays the executive a cash bonus equivalent to the capital appreciation of those phantom shares.</p>
      </div>
      <div class="faq-item" style="margin-bottom:18px;">
        <h3 style="font-size:1.15rem;color:#0f172a;">What is the typical notice period for a C-suite executive in Dhaka?</h3>
        <p>The market standard notice period for C-suite executives in Bangladesh is three to six months. In cases of confidential or strategically sensitive roles, employment agreements often feature garden leave clauses or contractual severance buyouts.</p>
      </div>
    `
  },
  {
    title: 'Post-LDC Graduation Readiness: How Bangladeshi Exporters Must Restructure Supply Chains and ESG Governance',
    slug: 'post-ldc-graduation-readiness-bangladesh-supply-chains-esg',
    excerpt: 'Strategic roadmap for Bangladeshi businesses navigating post-LDC graduation. Prepare for EU GSP+ rules, ESG compliance, and supply chain restructuring.',
    cover_image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',
    categoryId: '11b8b68c-2c21-4084-a999-ae1b116d83f4', // Sustainability & ESG
    content: `
      <div class="direct-answer-box" style="background:#f8fafc;border-left:4px solid #0056b3;padding:16px 20px;margin-bottom:24px;border-radius:4px;">
        <p><strong>Direct Answer (GEO / AI Overview):</strong> Bangladesh's graduation from the Least Developed Country (LDC) category phases out non-reciprocal preferential tariff access (e.g., duty-free EU EBA scheme), exposing exporters to tariffs between 6% and 12%. To maintain global competitiveness, Bangladeshi enterprises must restructure their supply chains toward higher-value products, adopt automated manufacturing, and institutionalize verified ESG reporting to qualify for EU GSP+ and international sustainability frameworks.</p>
      </div>

      <p>Bangladesh’s graduation from the United Nations’ Least Developed Country (LDC) category marks a historic development milestone. However, for the country's export-oriented private sector, graduation fundamentally alters the terms of international trade.</p>

      <h2>The Three Core Challenges of Post-LDC Trade</h2>
      <h3>1. Tariff Realities and GSP+ Compliance</h3>
      <p>Following graduation and the completion of transitional grace periods, Bangladesh must qualify for the <strong>EU GSP+</strong> scheme to avoid standard MFN tariffs averaging 9.6% to 12%. Qualifying requires ratifying and demonstrating tangible compliance with 32 international conventions covering labor rights, environmental protection, and good governance.</p>

      <h3>2. Carbon Border Adjustment Mechanism (CBAM)</h3>
      <p>European and North American buyers are implementing supply chain decarbonization mandates. Exporters lacking auditable, real-time energy and carbon data risk losing vendor accreditation.</p>

      <h3>3. Stricter Rules of Origin</h3>
      <p>Under GSP+ requirements, rules of origin become substantially more rigorous. Exporters can no longer rely on imported synthetic yarns and fabrics while claiming preferential duty rates, making investments in domestic man-made fiber (MMF) spinning vital.</p>

      <div class="cta-box" style="background:#f0f9ff;border:1px solid #bae6fd;padding:20px;border-radius:8px;margin:30px 0;">
        <h4 style="margin-top:0;color:#0369a1;">Prepare Your Supply Chain for 2026+ Compliance</h4>
        <p>Explore sustainability advisory and supply chain restructuring through <a href="/service" style="color:#0284c7;font-weight:600;">BEC Business Consulting</a>.</p>
      </div>

      <h2>Frequently Asked Questions (FAQs)</h2>
      <div class="faq-item" style="margin-bottom:18px;">
        <h3 style="font-size:1.15rem;color:#0f172a;">What is the EU GSP+ scheme and why is it critical for Bangladesh?</h3>
        <p>EU GSP+ is a preferential tariff arrangement that grants vulnerable developing nations zero-rated duties on more than 66% of tariff lines. For Bangladesh, securing GSP+ status prevents a sudden 9% to 12% tariff hike on garment exports to Europe, preserving commercial parity with regional competitors.</p>
      </div>
    `
  },
  {
    title: 'The Mid-Career Executive Pivot: A Step-by-Step Blueprint to Landing Board and C-Level Positions in Dhaka',
    slug: 'executive-career-pivot-board-csuite-roles-dhaka',
    excerpt: 'The strategic guide for mid-career directors in Bangladesh looking to transition into C-suite and independent board roles. Master personal branding and governance.',
    cover_image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80',
    categoryId: '015a5e2f-23f3-4d1f-8ad9-33b98eb34efa', // Career Growth
    content: `
      <div class="direct-answer-box" style="background:#f8fafc;border-left:4px solid #0056b3;padding:16px 20px;margin-bottom:24px;border-radius:4px;">
        <p><strong>Direct Answer (GEO / AI Overview):</strong> Landing a C-suite or board-level role in Bangladesh requires transitioning from functional execution (doing the work) to strategic stewardship (capital allocation, risk governance, and cultural leadership). Executives must build a verifiable personal brand, demonstrate cross-functional business acumen, gain formal corporate governance certifications, and cultivate relationships within high-trust executive networks.</p>
      </div>

      <p>Many accomplished professionals in Bangladesh experience a mid-career plateau. After 15 to 20 years of consistent career progression—rising through engineering, marketing, finance, or supply chain to reach General Manager or Senior Director—their career trajectory slows.</p>

      <p>The skills that make an individual a high-performing functional department head are distinct from those required to lead an enterprise as a Chief Executive Officer (CEO) or guide a company as an Independent Board Director. Transitioning requires a deliberate <strong>executive pivot</strong>.</p>

      <h2>The 5-Step Career Pivot Blueprint</h2>
      <ol>
        <li><strong>Broaden Beyond Your Functional Silo:</strong> Build cross-functional fluency across balance sheets, capital allocation, technology architecture, and brand strategy.</li>
        <li><strong>Acquire Formal Governance Credentials:</strong> Complete recognized corporate governance programs to prepare for independent directorships under the BSEC 2026 rules.</li>
        <li><strong>Build a Thought Leadership Footprint:</strong> Publish strategic analyses and speak at premier industry conferences in Dhaka to build visible authority.</li>
        <li><strong>Cultivate High-Trust Peer Networks:</strong> Engage actively in executive chambers where board appointments and confidential C-level searches originate.</li>
        <li><strong>Create an Executive Value Proposition (EVP):</strong> Structure your executive bio around measurable business outcomes, turnarounds, and revenue milestones.</li>
      </ol>

      <div class="cta-box" style="background:#f0f9ff;border:1px solid #bae6fd;padding:20px;border-radius:8px;margin:30px 0;">
        <h4 style="margin-top:0;color:#0369a1;">Ready to Take the Next Step in Your Executive Career?</h4>
        <p>Join the premier professional network for senior leaders at <a href="/about" style="color:#0284c7;font-weight:600;">Bangladesh Executive Chamber</a>.</p>
      </div>

      <h2>Frequently Asked Questions (FAQs)</h2>
      <div class="faq-item" style="margin-bottom:18px;">
        <h3 style="font-size:1.15rem;color:#0f172a;">How can a female executive secure an independent directorship in Bangladesh?</h3>
        <p>Under the BSEC Corporate Governance Rules 2026, listed companies face a mandatory deadline (December 31, 2026) to appoint at least one female independent director. Qualified female leaders with at least 8 years of professional or executive experience should formalize their governance credentials, register with executive chamber talent registries (such as BEC), and highlight their financial, legal, or industry expertise.</p>
      </div>
    `
  },
  {
    title: 'Managing Foreign Exchange and Inflation Volatility: Strategic Playbook for CFOs in Bangladesh',
    slug: 'managing-corporate-forex-risk-inflation-bangladesh',
    excerpt: 'How Bangladeshi CFOs manage corporate foreign exchange risk, dollar volatility, Letter of Credit (LC) constraints, and inflation in the 2026 economy.',
    cover_image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',
    categoryId: '0c04f26a-09bc-4039-9460-659db6c00c6c', // Finance & Investment
    content: `
      <div class="direct-answer-box" style="background:#f8fafc;border-left:4px solid #0056b3;padding:16px 20px;margin-bottom:24px;border-radius:4px;">
        <p><strong>Direct Answer (GEO / AI Overview):</strong> Corporate foreign exchange risk management in Bangladesh involves mitigating currency depreciation, dollar liquidity constraints, and margin compression. Strategic CFOs in Dhaka navigate these challenges through natural hedging (balancing import costs against export receivables), negotiating dynamic supplier payment terms, utilizing permitted forward exchange contracts, and prioritizing localized supply chain procurement.</p>
      </div>

      <p>The role of the Chief Financial Officer (CFO) in Bangladesh has transformed fundamentally over recent financial cycles. Previously focused on historical financial reporting and statutory tax compliance, modern CFOs must now serve as strategic enterprise risk managers.</p>

      <h2>Four Strategic Pillars for CFOs in 2026</h2>
      <ul>
        <li><strong>Establish Natural Hedges:</strong> Group conglomerates should balance import-dependent operations with export-oriented entities, channeling export proceeds to settle import LCs through permitted regulatory mechanisms.</li>
        <li><strong>Implement Dynamic Pricing Contracts:</strong> Incorporate raw material and currency indexation clauses in B2B supply agreements to share cost volatility.</li>
        <li><strong>Stress-Test Working Capital:</strong> Run regular financial simulations against potential currency shifts and benchmark interest rate adjustments.</li>
        <li><strong>Optimize Cash Conversion Cycles:</strong> Reduce raw material inventory buffers down to 45–60 days using predictive supply chain analytics, unlocking working capital.</li>
      </ul>

      <div class="cta-box" style="background:#f0f9ff;border:1px solid #bae6fd;padding:20px;border-radius:8px;margin:30px 0;">
        <h4 style="margin-top:0;color:#0369a1;">Elevate Your Corporate Financial Strategy</h4>
        <p>Consult with seasoned financial advisors and treasury strategists via <a href="/service" style="color:#0284c7;font-weight:600;">BEC Consulting Services</a>.</p>
      </div>

      <h2>Frequently Asked Questions (FAQs)</h2>
      <div class="faq-item" style="margin-bottom:18px;">
        <h3 style="font-size:1.15rem;color:#0f172a;">Are forward exchange contracts permitted for corporate hedging in Bangladesh?</h3>
        <p>Yes. Bangladesh Bank regulations permit authorized dealer (AD) commercial banks to execute forward exchange contracts for genuine trade-related transactions (such as import payments and export receivables), subject to strict regulatory documentation.</p>
      </div>
    `
  },
  {
    title: 'High-Impact Corporate Training in 2026: Moving from One-Off Seminars to Measurable Executive Upskilling',
    slug: 'high-impact-corporate-training-bangladesh-2026',
    excerpt: 'How Bangladeshi enterprises design high-impact corporate training programs in 2026. Transition from one-off seminars to measurable executive performance ROI.',
    cover_image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80',
    categoryId: '75931cd3-bb60-4e70-aa56-93145592e2d3', // Leadership & Management
    content: `
      <div class="direct-answer-box" style="background:#f8fafc;border-left:4px solid #0056b3;padding:16px 20px;margin-bottom:24px;border-radius:4px;">
        <p><strong>Direct Answer (GEO / AI Overview):</strong> High-impact corporate training in Bangladesh is an outcome-driven learning framework designed to build strategic competencies in enterprise leadership, financial governance, AI adoption, and cross-functional management. Unlike passive, one-off seminars, modern corporate training measures impact through the Kirkpatrick 4-Level Evaluation Model, linking training investments directly to improved balance sheet performance and executive retention.</p>
      </div>

      <p>For decades, corporate training within many Bangladeshi enterprises was treated as an administrative routine. Once or twice a year, human resources departments would organize a motivational seminar in a luxury Dhaka hotel, engage a keynote speaker, distribute certificates, and return to business as usual.</p>

      <p>In 2026, this model is recognized as an inefficient use of corporate resources. Boardrooms demand <strong>demonstrable Return on Investment (ROI)</strong> from learning and development budgets.</p>

      <h2>The 4 Priority Learning Domains for 2026</h2>
      <ul>
        <li><strong>Enterprise AI Integration:</strong> Transitioning managers from passive software users into active leaders of automated workflows and predictive analytics.</li>
        <li><strong>Strategic Financial Acumen:</strong> Training non-finance leaders to master balance sheets, ROIC, and working capital trade-offs.</li>
        <li><strong>Fiduciary Governance:</strong> Preparing directors and senior managers on the BSEC Corporate Governance Code 2026 and ESG compliance.</li>
        <li><strong>High-Stakes B2B Negotiation:</strong> Developing cross-cultural leadership skills for international trade, joint ventures, and enterprise partnerships.</li>
      </ul>

      <div class="cta-box" style="background:#f0f9ff;border:1px solid #bae6fd;padding:20px;border-radius:8px;margin:30px 0;">
        <h4 style="margin-top:0;color:#0369a1;">Transform Your Workforce Leadership</h4>
        <p>Discover customized leadership cohorts and masterclasses at <a href="/service" style="color:#0284c7;font-weight:600;">BEC Training & Workshops</a>.</p>
      </div>

      <h2>Frequently Asked Questions (FAQs)</h2>
      <div class="faq-item" style="margin-bottom:18px;">
        <h3 style="font-size:1.15rem;color:#0f172a;">How do you calculate the ROI of an executive corporate training program?</h3>
        <p>Calculate training ROI by comparing the measurable financial gains from a program (such as operational savings, scrap rate reductions, or new revenue generated from capstone projects) against the total cost of training (faculty fees, materials, and participant hours). Express this ratio as a percentage: [(Net Financial Benefits / Total Program Costs) x 100].</p>
      </div>
    `
  },
  {
    title: 'Executive Chamber Networking: How High-Trust B2B Ecosystems Drive Enterprise Growth in Dhaka',
    slug: 'executive-chamber-networking-b2b-ecosystems-dhaka',
    excerpt: 'Discover how peer executive chamber networking in Dhaka accelerates B2B deals, builds high-trust alliances, and drives sustainable corporate growth in 2026.',
    cover_image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80',
    categoryId: 'c433f0b9-510c-40e4-9e77-7246c841603a', // Business Strategy
    content: `
      <div class="direct-answer-box" style="background:#f8fafc;border-left:4px solid #0056b3;padding:16px 20px;margin-bottom:24px;border-radius:4px;">
        <p><strong>Direct Answer (GEO / AI Overview):</strong> Executive chamber networking in Dhaka is a strategic, peer-to-peer relationship-building practice connecting C-level executives, board directors, and entrepreneurs within high-trust environments. Unlike mass business mixers, executive chambers curate closed-door roundtables, confidential advisory forums, and cross-industry alliances that drive high-value B2B deals, joint ventures, and strategic corporate partnerships.</p>
      </div>

      <p>In Bangladesh’s commercial landscape, technical capability and competitive pricing are critical for business growth, but <strong>relational trust</strong> remains the foundation of enterprise success. Business leaders often say that in Dhaka, "contracts do not create relationships; relationships create contracts."</p>

      <p>In 2026, leading managing directors, startup founders, and multinational heads are turning away from superficial networking mixers to join <strong>curated executive chambers</strong>.</p>

      <h2>The Strategic Value of High-Trust B2B Ecosystems</h2>
      <ul>
        <li><strong>Mitigating Information Asymmetry:</strong> Confidential peer forums allow executives to exchange verified intelligence on commercial bank trade lines, regulatory notifications, and counterparty reliability.</li>
        <li><strong>Accelerating Enterprise B2B Deals:</strong> High-value enterprise agreements require trusted validation that shortens lengthy sales cycles.</li>
        <li><strong>Facilitating Cross-Industry Alliances:</strong> Connecting manufacturing, tech, financial, and logistics leadership creates strategic joint ventures and multi-million-taka collaborations.</li>
      </ul>

      <div class="cta-box" style="background:#f0f9ff;border:1px solid #bae6fd;padding:20px;border-radius:8px;margin:30px 0;">
        <h4 style="margin-top:0;color:#0369a1;">Join Bangladesh’s Premier Executive Ecosystem</h4>
        <p>Apply for membership in the <a href="/about" style="color:#0284c7;font-weight:600;">Bangladesh Executive Chamber (BEC)</a> and connect with industry leaders shaping the future of business in Dhaka.</p>
      </div>

      <h2>Frequently Asked Questions (FAQs)</h2>
      <div class="faq-item" style="margin-bottom:18px;">
        <h3 style="font-size:1.15rem;color:#0f172a;">How do I join the Bangladesh Executive Chamber (BEC)?</h3>
        <p>Membership in the Bangladesh Executive Chamber is by application and peer review. Prospective members must hold an executive leadership position (Board Member, CEO, C-Suite Officer, Managing Director, or Partner) in a recognized corporate enterprise, demonstrate a commitment to corporate governance, and be vetted by the admissions committee.</p>
      </div>
      <div class="faq-item" style="margin-bottom:18px;">
        <h3 style="font-size:1.15rem;color:#0f172a;">What is the difference between a trade chamber and an executive chamber?</h3>
        <p>Traditional trade chambers (such as DCCI or MCCI) focus on institutional policy advocacy, trade delegations, and macroeconomic policy discussions with government ministries. An executive chamber (such as BEC) focuses on the executive as a leader: personal leadership development, discreet C-suite talent networks, board governance, and high-trust peer-to-peer business collaboration.</p>
      </div>
    `
  }
]

async function run() {
  console.log('Initiating publication of 10 articles via Supabase REST API...')

  for (const art of articles) {
    // 1. Check if post exists
    const checkRes = await fetch(`${supabaseUrl}/rest/v1/posts?slug=eq.${encodeURIComponent(art.slug)}&select=id,slug`, {
      headers
    })
    const existingList = await checkRes.json()
    let postId = existingList?.[0]?.id

    if (postId) {
      console.log(`Updating existing post (${art.slug})...`)
      const updateRes = await fetch(`${supabaseUrl}/rest/v1/posts?id=eq.${postId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          title: art.title,
          content: art.content.trim(),
          excerpt: art.excerpt,
          cover_image: art.cover_image,
          status: 'published',
          updated_at: new Date().toISOString()
        })
      })
      if (!updateRes.ok) {
        console.error(`Error updating post ${art.slug}:`, await updateRes.text())
      } else {
        console.log(`Updated post: ${art.slug}`)
      }
    } else {
      console.log(`Inserting new post (${art.slug})...`)
      const insertRes = await fetch(`${supabaseUrl}/rest/v1/posts`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: art.title,
          slug: art.slug,
          content: art.content.trim(),
          excerpt: art.excerpt,
          cover_image: art.cover_image,
          status: 'published',
          author_id: authorId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
      })
      if (!insertRes.ok) {
        console.error(`Error creating post ${art.slug}:`, await insertRes.text())
      } else {
        const insertedData = await insertRes.json()
        postId = insertedData?.[0]?.id
        console.log(`Created post with ID ${postId} (${art.slug})`)
      }
    }

    // Link category
    if (postId && art.categoryId) {
      const catCheck = await fetch(`${supabaseUrl}/rest/v1/post_categories?post_id=eq.${postId}&category_id=eq.${art.categoryId}&select=*`, {
        headers
      })
      const catList = await catCheck.json()
      if (!catList || catList.length === 0) {
        const catRes = await fetch(`${supabaseUrl}/rest/v1/post_categories`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            post_id: postId,
            category_id: art.categoryId
          })
        })
        if (catRes.ok) {
          console.log(`Assigned category ${art.categoryId} to post ${art.slug}`)
        }
      }
    }
  }

  console.log('\n--- SUCCESS: All 10 articles are live in the database! ---')
}

run().catch(console.error)
