// Type definitions for the Resume Maker

export interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
    summary: string;
}

export interface Experience {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa: string;
}

export interface SkillsAndExtras {
    skills: string;
    certifications: string;
    languages: string;
    hobbies: string;
}

export interface ResumeData {
    personal: PersonalInfo;
    experiences: Experience[];
    education: Education[];
    skillsAndExtras: SkillsAndExtras;
}

export interface GeneratedResume {
    id?: string;
    user_id?: string;
    title: string;
    raw_input: ResumeData;
    generated_content: string;
    template: string;
    created_at?: string;
    updated_at?: string;
}
