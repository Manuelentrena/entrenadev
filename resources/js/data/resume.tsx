import { NotebookIcon } from 'lucide-react';
import { Icons } from '@/components/ui/icons';
import { Csharp } from '@/components/ui/svgs/csharp';
import { Docker } from '@/components/ui/svgs/docker';
import { GithubActions } from '@/components/ui/svgs/githubActions';
import { Java } from '@/components/ui/svgs/java';
import { Laravel } from '@/components/ui/svgs/laravel';
import { Nest } from '@/components/ui/svgs/nest';
import { NextjsIconDark } from '@/components/ui/svgs/nextjsIconDark';
import { Nodejs } from '@/components/ui/svgs/nodejs';
import { Php } from '@/components/ui/svgs/php';
import { Postgresql } from '@/components/ui/svgs/postgresql';
import { ReactLight } from '@/components/ui/svgs/reactLight';
import { Typescript } from '@/components/ui/svgs/typescript';

export const DATA = {
    name: 'Manuel Entrena',
    initials: 'ME',
    url: 'https://entrena.dev',
    location: 'Córdoba, ES',
    locationLink:
        'https://www.google.com/maps/place/C%C3%B3rdoba/@37.8915444,-4.7844853,13z',
    description:
        'Software engineer who loves building things, clean code, and great systems. Honors in Artificial Intelligence at university.',
    summary:
        'I have [over 6 years of experience](/#education) building web applications with [Typescript](/#skills) 💙, [React](/#skills) ⚛️, [PHP](/#skills) 🐘, [Laravel](/#skills) ❤️ and [Nest.js](/#skills) 🦁. I’ve [led full stack projects](/#projects) 🚀, working with Scrum 🧑‍💻, automated testing 🧪, CI/CD with [GitHub Actions](/#skills) 🔄, and [Docker 🐳](/#skills). I’m currently [studying LLMs, embeddings, RAG and agentic programming](/#education) 🤖. Outside of tech, I’m passionate about music 🎶 and creativity 🎸. I have an [intermediate English level (B1 Cambridge)](/#education) 🇬🇧 and I’m improving it every day ([2000+ Duolingo days](https://www.duolingo.com/profile/Manuel_Entrena) 🦉).',
    avatarUrl: '/me.png',
    skills: [
        { name: 'Laravel', icon: Laravel },
        { name: 'Php', icon: Php },
        { name: 'React', icon: ReactLight },
        { name: 'Next.js', icon: NextjsIconDark },
        { name: 'Nest.js', icon: Nest },
        { name: 'Typescript', icon: Typescript },
        { name: 'Node.js', icon: Nodejs },
        { name: 'Postgres', icon: Postgresql },
        { name: 'Docker', icon: Docker },
        { name: 'Github Actions', icon: GithubActions },
        { name: 'Java', icon: Java },
        { name: 'C++', icon: Csharp },
    ],
    navbar: [
        { href: '/', icon: Icons.logome, label: 'Home' },
        { href: '/blog', icon: NotebookIcon, label: 'Blog' },
    ],
    contact: {
        email: 'manuel.entrena@gmail.com',
        tel: '+34618981259',
        image: '/footer.png',
        social: {
            GitHub: {
                name: 'GitHub',
                url: 'https://github.com/Manuelentrena',
                icon: Icons.github,
                navbar: true,
            },
            LinkedIn: {
                name: 'LinkedIn',
                url: 'https://linkedin.com/in/manuelentrena',
                icon: Icons.linkedin,

                navbar: true,
            },
            Instagram: {
                name: 'Instagram',
                url: 'https://instagram.com/manuel_entrena',
                icon: Icons.instagram,

                navbar: true,
            },
            email: {
                name: 'Send Email',
                url: '#',
                icon: Icons.email,

                navbar: false,
            },
        },
    },

    work: [
        {
            company: 'Professional Career Break | Open to Work',
            href: 'https://www.linkedin.com/in/manuelentrena',
            badges: [],
            location: 'Córdoba, Spain',
            title: 'Full Stack Developer ( AI Researcher | English Student )',
            logoUrl: '/calendar.png',
            start: 'Nov 2023',
            end: 'Present',
            description:
                'Focused on improving English (B1 certified July 2024, preparing for B2) and studying Artificial Intelligence for web development. During this period, I also contributed to open source projects and built personal projects to enhance my skills and stay updated with industry trends.',
        },
        {
            company: 'Copyfly',
            badges: [],
            href: 'https://www.businessinsider.es/branded/copyfly-copisteria-disruptiva-mercado-bate-record-impresiones-logrando-100-millones-ano-1429812',
            location: 'Remote',
            title: 'Full Stack Developer ( Typescript | Firebase | ElasticSearch )',
            logoUrl: '/copyfly.jpeg',
            start: 'Nov 2024',
            end: 'Feb 2025',
            description:
                'Led the decoupling of third-party libraries, optimized advanced search filtering, enhanced the order configurator, and developed internal administrative tools for issue management.',
        },
        {
            company: 'Aicor Consultant',
            href: 'https://www.aicor.com/',
            badges: [],
            location: 'Córdoba, ES',
            title: 'Full Stack Developer ( Typescript | Laravel | WordPress )',
            logoUrl: '/aicor.jpeg',
            start: 'Feb 2024',
            end: 'Oct 2021',
            description:
                'Led the development of a web application for vehicle rentals, including a modern dashboard with rental billing functionality. Created a Starter Kit with an advanced Laravel API, React/Vite client, and Expo mobile app, and designed CI/CD workflows using GitHub Actions to streamline project initialization and delivery efficiency on AWS and VPS environments. Supported the ERP team by developing a trucking plugin (Settlements/Suppliers) following best practices and thorough testing.',
        },
        {
            company: 'Personal Goal Pursuit',
            href: 'https://piedradropa.com/',
            badges: [],
            location: 'Córdoba, ES',
            title: 'Musician | Full Stack Developer ( Node | React | LitElement )',
            logoUrl: '/calendar.png',
            start: 'Jan 2017',
            end: 'Oct 2021',
            description:
                'Pursued a music career while working in family business, fiber-optic installation, winery, and public sector roles. Gained strong discipline, teamwork, and coordination skills. Managed a candy shop and built a custom inventory app (Node, React). Developed a band website (LitElement, SEO, email marketing).',
        },
        {
            company: 'Freelance Software Development',
            href: 'https://www.carlosarte.com/',
            badges: [],
            location: 'Córdoba, ES',
            title: 'Full Stack Developer ( WordPress | React )',
            logoUrl: '/freelance.jpeg',
            start: 'Apr 2016',
            end: 'Oct 2016',
            description:
                'Worked with small business owners and freelancers to improve the visibility and impact of their personal brands, organized and led business meetings, and designed web interfaces, logos, and content for their websites.',
        },
        {
            company: 'Cegid ( Ex-Meta4 )',
            href: 'https://www.cegid.com/ib/es/',
            badges: [],
            location: 'Madrid, ES',
            title: 'QA Automation Engineer ( Selenium | M4People )',
            logoUrl: '/cegid.jpeg',
            start: 'Oct 2015',
            end: 'Mar 2016',
            description:
                'Developed automated tests using Selenium and M4People, supervised the development team during releases, applied Scrum methodologies within the team, and implemented a PDF diff testing workflow to detect bugs and improve software quality.',
        },
        {
            company: 'UCO ( University of Córdoba )',
            href: 'https://www.uco.es/',
            badges: [],
            location: 'Córdoba, ES',
            title: 'Full Stack Developer ( Javascript | PHP | Jquery )',
            logoUrl: '/uco.jpeg',
            start: 'Oct 2014',
            end: 'Sep 2015',
            description:
                'Developed a website for a Master’s program, implemented PDF features, calendar creation, and interactive schedule assignment functionalities, and collaborated within a team to successfully deliver the project.',
        },
        {
            company: 'CyberCordoba SL',
            href: 'https://cybercordoba.es/',
            badges: [],
            location: 'Córdoba, ES',
            title: 'Full Stack Developer ( Javascript | PHP | Jquery )',
            logoUrl: '/cybercordoba.jpeg',
            start: 'Apr 2008',
            end: 'Jun 2008',
            description:
                'Developed an electricity billing management system for a homeowners’ association, implemented automated PDF invoice generation, and applied regulatory and compliance knowledge throughout the project.',
        },
    ],
    education: [
        {
            school: 'Codely ( Online Coding School )',
            href: 'https://codely.com/en',
            degree: 'Currently studying LLMs, RAG and agentic programming',
            logoUrl: '/codely.png',
            start: '2021',
            end: 'Present',
        },
        {
            school: 'Cambridge University',
            href: 'https://www.cambridgeenglish.org/',
            degree: 'B1 Preliminary (PET) - Currently preparing for B2 First (FCE)',
            logoUrl: '/cambridge.jpeg',
            start: '2023',
            end: 'Present',
        },
        {
            school: 'University of Córdoba',
            href: 'https://www.uco.es/',
            degree: 'Engineering Degree in Computer Science',
            logoUrl: '/uco.jpeg',
            start: '2008',
            end: '2014',
        },
        {
            school: 'IES Trassierra',
            href: 'https://iestrassierra.com/',
            degree: 'Vocational High School and Secondary Business',
            logoUrl: '/trassierra.png',
            start: '2016',
            end: '2021',
        },
    ],
    projects: [
        {
            title: 'Duellum',
            href: 'https://duellum.online/login',
            dates: 'Jun 2025 - Present',
            active: true,
            description:
                'Duellum is a fast-paced online strategy game where players battle in tactical duels, and compete for dominance in dynamic PvP matches. Outsmart your opponents, adapt your strategy, and climb the competitive arena.',
            technologies: [
                'Nest.js',
                'Typescript',
                'React',
                'PostgreSQL',
                'TailwindCSS',
                '8bitcn',
                'Docker',
                'GitHub Actions',
            ],
            links: [
                {
                    type: 'Website',
                    href: 'https://duellum.online/login',
                    icon: <Icons.globe className="size-3" />,
                },
            ],
            image: 'https://imagedelivery.net/vkH-_KAmKeWBBVeCxTyWtQ/293e396b-8cf1-47db-2115-11b2b5e3c000/public',
            video: 'https://res.cloudinary.com/manuelentrena/video/upload/v1777566359/duellum_a0jqii.mp4',
        },
        {
            title: 'Carlos Arte - Personal Brand',
            href: 'https://www.carlosarte.com/',
            dates: 'June 2023 - Present',
            active: true,
            description:
                'Designed, developed and sold animated UI components for developers.',
            technologies: [
                'Next.js',
                'Typescript',
                'PostgreSQL',
                'Prisma',
                'TailwindCSS',
                'Stripe',
                'Shadcn UI',
                'Magic UI',
            ],
            links: [
                {
                    type: 'Website',
                    href: 'https://www.carlosarte.com/',
                    icon: <Icons.globe className="size-3" />,
                },
                {
                    type: 'Source',
                    href: 'https://github.com/Manuelentrena/carlos-mg',
                    icon: <Icons.github className="size-3" />,
                },
            ],
            image: '',
            video: 'https://res.cloudinary.com/manuelentrena/video/upload/v1777566347/carlos_kyqzml.mp4',
        },
    ],
    hackathons: [
        {
            title: 'Devathon IX - Programacion-es.dev',
            dates: 'March 20 – April 21, 2025',
            location: '🏆 WINNER - 1st Place in Devathon IX',
            description:
                'A magical dueling system inspired by the world of Harry Potter, recreating the classic “Rock, Paper, Scissors” dynamic through wizard spells and enchanted combat.',
            image: 'https://programacion-es.dev/PEE_logo.png',
            win: 'WINNER - 1st Place in Devathon IX',
            mlh: 'https://s3.amazonaws.com/logged-assets/trust-badge/2018/white.svg',
            links: [
                {
                    title: 'Devathon IX',
                    icon: <Icons.globe className="h-4 w-4" />,
                    href: 'https://programacion-es.dev/devathon-ix-edition/',
                },
                {
                    title: 'Backend Source',
                    icon: <Icons.github className="h-4 w-4" />,
                    href: 'https://github.com/Manuelentrena/devathon-9-backend',
                },
            ],
        },
    ],
} as const;
