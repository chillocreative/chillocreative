export interface Service {
    id: string;
    title: string;
    description: string;
    iconName: string; // We will use this to map to Lucide icons dynamically or manually
}

export const services: Service[] = [
    {
        id: 'web-design',
        title: 'Website Design',
        description: 'Stunning, user-centric designs that tell your brand story and convert visitors into loyal customers.',
        iconName: 'Palette'
    },
    {
        id: 'web-app',
        title: 'Web Application System',
        description: 'Robust, scalable, and secure web applications tailored to streamline your business operations.',
        iconName: 'LayoutGrid'
    },
    {
        id: 'mobile-apps',
        title: 'Mobile Apps',
        description: 'Native and cross-platform mobile experiences that engage users on the go.',
        iconName: 'Smartphone'
    },
    {
        id: 'maintenance',
        title: 'Website Maintenance',
        description: 'Keep your digital presence secure, up-to-date, and performing at its peak.',
        iconName: 'Wrench'
    },
    {
        id: 'seo',
        title: 'SEO',
        description: 'Data-driven strategies to improve your visibility and drive organic traffic to your site.',
        iconName: 'Search'
    }
];
