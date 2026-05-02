import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { 
  AlertCircle, Check, FileSignature, X, 
  Users, Briefcase, MessageSquare, Sparkles, 
  ShieldCheck, HelpCircle, Bell, Heart 
} from 'lucide-react';

// === IMPORT LOCAL IMAGES FROM ASSETS ===
import festivalBg from '../assets/pera.png'; 

// --- Official Color Palette (Extracted from Jatra Logo) ---
const colors = {
  jatraRed: '#E51937',    // Official Red
  jatraYellow: '#F4A900', // Official Yellow/Gold
  jatraGreen: '#008542',  // Official Green
  jatraBlue: '#008DD2',   // Official Sky Blue
  
  darkBg: '#0d1117',      // Deep dark background
  panelBg: '#111111',     // Slightly lighter dark for panels
  textLight: '#ffffff',
  textDark: '#1a1a1a',
  bgGray: '#f4f5f7',
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0px rgba(229, 25, 55, 0.2); }
  50% { box-shadow: 0 0 15px rgba(229, 25, 55, 0.6); }
  100% { box-shadow: 0 0 0px rgba(229, 25, 55, 0.2); }
`;

// --- Styled Components ---
const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #111111 0%, #0d1117 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  gap: 60px;
  font-family: 'Open Sans', 'Segoe UI', sans-serif;
  overflow-x: hidden;
  @media (max-width: 768px) { padding: 30px 10px; gap: 40px; }
`;

const MainCard = styled.div`
  display: flex; width: 100%; max-width: 1100px; height: 85vh; background: #ffffff;
  border-radius: 24px; box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5); overflow: hidden;
  animation: ${fadeIn} 0.8s ease-out;
  @media (max-width: 768px) { flex-direction: column; height: auto; min-height: 90vh; }
`;

const LeftPanel = styled.div`
  flex: 0 0 40%; 
  background-color: ${colors.darkBg}; 
  background-image: url(${festivalBg});
  background-size: cover; 
  background-position: center;
  position: relative; padding: 50px 40px; display: flex; flex-direction: column; justify-content: space-between; color: ${colors.textLight};
  &::before { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(13,17,23,0.95) 100%); }
  @media (max-width: 768px) { flex: 0 0 auto; height: 250px; padding: 30px 20px; }
`;

const LeftContent = styled.div`position: relative; z-index: 1;`;
const LogoText = styled.h2`font-size: 24px; font-weight: 800; color: ${colors.textLight}; margin-bottom: 40px; display: flex; align-items: center; gap: 10px; span { color: ${colors.jatraYellow}; } @media (max-width: 768px) { margin-bottom: 20px; font-size: 20px; }`;
const MainHeading = styled.h1`font-size: 42px; font-weight: 800; line-height: 1.2; margin-bottom: 15px; @media (max-width: 768px) { font-size: 28px; }`;
const SubHeading = styled.p`font-size: 16px; color: #dddddd; margin-bottom: 30px; line-height: 1.5;`;

const RightPanel = styled.div`
  flex: 1; padding: 40px 50px; overflow-y: auto; background: #ffffff;
  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }
  &::-webkit-scrollbar-thumb:hover { background: ${colors.jatraYellow}; }
  @media (max-width: 768px) { padding: 30px 20px; overflow-y: visible; }
`;

const FormHeader = styled.div`margin-bottom: 30px;`;
const FormTitle = styled.h2`font-size: 28px; font-weight: 800; color: ${colors.textDark}; margin-bottom: 8px;`;
const FormSubtitle = styled.p`font-size: 14px; color: #666;`;
const FormSection = styled.div`margin-bottom: 25px;`;
const SectionLabel = styled.label`display: block; font-size: 14px; font-weight: 700; color: ${colors.textDark}; margin-bottom: 10px; span { color: ${colors.jatraRed}; }`;
const SectionSubLabel = styled.p`font-size: 12px; color: #666; margin-top: -6px; margin-bottom: 10px; font-weight: 600;`;
const InputGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 15px; @media (max-width: 768px) { grid-template-columns: 1fr; }`;

const StyledInput = styled.input`
  width: 100%; padding: 14px 18px; background-color: ${colors.bgGray}; border: 2px solid transparent;
  border-radius: 12px; font-size: 14px; color: ${colors.textDark}; outline: none; transition: all 0.3s;
  &:focus { background-color: #fff; border-color: ${colors.jatraYellow}; box-shadow: 0 4px 12px rgba(244, 169, 0, 0.15); }
  &::placeholder { color: #999; }
`;

const StyledSelect = styled.select`
  width: 100%; padding: 14px 18px; background-color: ${colors.bgGray}; border: 2px solid transparent;
  border-radius: 12px; font-size: 14px; color: ${colors.textDark}; outline: none; cursor: pointer; appearance: none;
  &:focus { background-color: #fff; border-color: ${colors.jatraYellow}; box-shadow: 0 4px 12px rgba(244, 169, 0, 0.15); }
`;

const StyledTextArea = styled.textarea`
  width: 100%; padding: 14px 18px; background-color: ${colors.bgGray}; border: 2px solid transparent;
  border-radius: 12px; font-size: 14px; color: ${colors.textDark}; outline: none; resize: vertical; min-height: 80px; transition: all 0.3s;
  &:focus { background-color: #fff; border-color: ${colors.jatraYellow}; box-shadow: 0 4px 12px rgba(244, 169, 0, 0.15); }
`;

const ToggleGroup = styled.div`display: flex; gap: 10px; margin-bottom: 15px;`;
const ToggleBtn = styled.button<{ selected: boolean }>`
  padding: 10px 30px; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s;
  background-color: ${props => props.selected ? colors.jatraYellow : colors.bgGray};
  color: ${props => props.selected ? colors.textDark : colors.textDark};
  border: 2px solid ${props => props.selected ? colors.jatraYellow : 'transparent'};
  &:hover { background-color: ${props => props.selected ? colors.jatraYellow : '#e2e5e9'}; }
`;

const PillGroup = styled.div`display: flex; flex-wrap: wrap; gap: 10px;`;
const PillButton = styled.button<{ selected: boolean }>`
  padding: 10px 20px; border-radius: 30px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s;
  background-color: ${props => props.selected ? colors.jatraYellow : colors.bgGray};
  color: ${props => props.selected ? colors.textDark : '#555'};
  border: 1px solid ${props => props.selected ? colors.jatraYellow : 'transparent'};
  box-shadow: ${props => props.selected ? '0 4px 10px rgba(244, 169, 0, 0.3)' : 'none'};
  &:hover { background-color: ${props => props.selected ? colors.jatraYellow : '#e2e5e9'}; }
`;

const UndertakingBtn = styled.button<{ complete: boolean }>`
  width: 100%; padding: 16px; margin-top: 10px; border-radius: 12px; font-size: 15px; font-weight: 700; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.3s;
  background-color: ${props => props.complete ? colors.jatraGreen : '#fff'};
  color: ${props => props.complete ? '#fff' : colors.jatraRed};
  border: 2px solid ${props => props.complete ? colors.jatraGreen : colors.jatraRed};
  animation: ${props => props.complete ? 'none' : css`${pulseGlow} 2s infinite`};
  &:hover { background-color: ${props => props.complete ? '#00753a' : '#fff0ed'}; }
`;

const SubmitButton = styled.button`
  width: 100%; padding: 16px; background-color: ${colors.textDark}; color: #fff; font-size: 16px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px; border: none; border-radius: 12px; cursor: pointer; transition: all 0.3s; margin-top: 15px;
  &:hover { background-color: #000; transform: translateY(-2px); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2); }
  &:disabled { background-color: #ccc; cursor: not-allowed; transform: none; box-shadow: none; }
`;

// --- Modal Styled Components ---
const ModalOverlay = styled.div`
  position: fixed; inset: 0; z-index: 1000; background: rgba(0,0,0,0.7); backdrop-filter: blur(5px);
  display: flex; align-items: center; justify-content: center; padding: 20px;
`;
const ModalCard = styled.div`
  background: #fff; width: 100%; max-width: 500px; border-radius: 20px; overflow: hidden;
  animation: ${fadeIn} 0.3s ease-out; box-shadow: 0 20px 40px rgba(0,0,0,0.4);
`;
const ModalHeader = styled.div`
  background: ${colors.jatraRed}; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;
  h3 { margin: 0; font-size: 18px; font-weight: 800; display: flex; align-items: center; gap: 10px; }
  button { background: none; border: none; color: #fff; cursor: pointer; border-radius: 50%; padding: 5px; transition: background 0.2s; &:hover { background: rgba(255,255,255,0.2); } }
`;
const ModalBody = styled.div`padding: 25px; display: flex; flex-direction: column; gap: 20px;`;
const LevelContainer = styled.div`display: flex; justify-content: space-between; max-width: 300px; margin: 0 auto;`;
const LevelBtn = styled.button<{ active: boolean }>`
  width: 45px; height: 45px; border-radius: 50%; font-size: 16px; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s;
  background-color: ${props => props.active ? colors.jatraYellow : colors.bgGray};
  color: ${props => props.active ? colors.textDark : '#666'};
  transform: ${props => props.active ? 'scale(1.1)' : 'scale(1)'};
  box-shadow: ${props => props.active ? '0 5px 15px rgba(244, 169, 0, 0.4)' : 'none'};
`;
const CheckRow = styled.div<{ checked: boolean }>`
  display: flex; gap: 15px; padding: 15px; border-radius: 12px; cursor: pointer; transition: all 0.2s;
  border: 2px solid ${props => props.checked ? colors.jatraGreen : '#e2e5e9'};
  background-color: ${props => props.checked ? 'rgba(0, 133, 66, 0.05)' : '#fff'};
  p { margin: 0; font-size: 13px; color: ${colors.textDark}; line-height: 1.5; font-weight: 500; }
`;
const CheckBox = styled.div<{ checked: boolean }>`
  width: 24px; height: 24px; flex-shrink: 0; border-radius: 6px; display: flex; align-items: center; justify-content: center;
  border: 2px solid ${props => props.checked ? colors.jatraGreen : '#ccc'};
  background-color: ${props => props.checked ? colors.jatraGreen : '#fff'};
`;
const ModalFooter = styled.div`padding: 20px 25px; background: ${colors.bgGray}; display: flex; justify-content: flex-end; border-top: 1px solid #e2e5e9;`;
const SaveBtn = styled.button`
  background: ${colors.textDark}; color: #fff; padding: 12px 25px; border: none; border-radius: 10px; font-weight: 700; cursor: pointer;
  &:hover { background: #000; }
`;

// --- Guidelines Styled Components ---
const GuidelinesContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  animation: ${fadeIn} 1s ease-out 0.3s both;
  color: ${colors.textLight};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  h2 { font-size: 36px; font-weight: 800; color: #fff; margin-bottom: 10px; }
  p { font-size: 16px; color: #aaa; max-width: 600px; margin: 0 auto; }
`;

const GuidelinesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
`;

const GuidelineCard = styled.div<{ borderTopColor: string }>`
  background: ${colors.panelBg};
  border-radius: 16px;
  padding: 30px;
  border-top: 4px solid ${props => props.borderTopColor};
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  transition: transform 0.3s ease;
  &:hover { transform: translateY(-5px); }
`;

const CardHead = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  h3 { font-size: 20px; font-weight: 700; color: #fff; margin: 0; }
`;

const GuidelineList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    color: #cccccc;
    font-size: 14.5px;
    line-height: 1.6;
    margin-bottom: 12px;
    padding-left: 24px;
    position: relative;
    &:last-child { margin-bottom: 0; }
    &::before {
      content: '▹';
      color: ${colors.jatraYellow};
      position: absolute;
      left: 0;
      top: 0px;
      font-size: 16px;
      font-weight: bold;
    }
  }
`;

const ConclusionBox = styled.div`
  margin-top: 40px;
  text-align: center;
  padding: 40px;
  background: linear-gradient(135deg, rgba(229, 25, 55, 0.1) 0%, rgba(244, 169, 0, 0.1) 100%);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  p { font-size: 17px; color: #ddd; line-height: 1.6; margin-bottom: 20px; }
  h4 { font-size: 26px; font-weight: 800; color: ${colors.jatraYellow}; margin: 0; display: flex; justify-content: center; align-items: center; gap: 10px; }
`;

// --- Data ---
const contributionAreas = [
  'Management & Coordination',
  'Content / Creative',
  'Social Media / Promotion',
  'Logistics / Ground Work',
  'Sponsorship / Outreach',
  'Technical'
];

const guidelineData = [
  {
    title: "How We'll Work",
    icon: <Users size={24} color={colors.jatraBlue} />,
    color: colors.jatraBlue,
    items: [
      "You'll be part of a specific team/department.",
      "Each team will have a lead/coordinator to guide you.",
      "You're always free to share ideas, but final decisions will flow through the team leads for smooth execution."
    ]
  },
  {
    title: "Your Role",
    icon: <Briefcase size={24} color={colors.jatraGreen} />,
    color: colors.jatraGreen,
    items: [
      "Be present, punctual, and involved during your assigned time.",
      "Complete tasks responsibly, but don't hesitate to ask questions or seek clarity.",
      "Stay active and responsive—events are dynamic, and flexibility helps.",
      "You're encouraged to take initiative, just keep your lead informed."
    ]
  },
  {
    title: "Communication",
    icon: <MessageSquare size={24} color={colors.jatraYellow} />,
    color: colors.jatraYellow,
    items: [
      "Stay connected on official groups and updates.",
      "Keep your team lead in the loop about your work.",
      "If something feels unclear, ask—no hesitation."
    ]
  },
  {
    title: "Work + Experience",
    icon: <Sparkles size={24} color={colors.jatraRed} />,
    color: colors.jatraRed,
    items: [
      "While you have responsibilities, we also want you to experience and enjoy the festival.",
      "Once your tasks are managed, take moments to engage, observe, and be part of the vibe.",
      "Support others when needed—it keeps the energy flowing."
    ]
  },
  {
    title: "Conduct & Environment",
    icon: <ShieldCheck size={24} color={colors.jatraBlue} />,
    color: colors.jatraBlue,
    items: [
      "Be respectful, calm, and approachable with everyone.",
      "You represent Jatra in your own way.",
      "Keep the space positive, inclusive, and welcoming."
    ]
  },
  {
    title: "If Something Comes Up",
    icon: <HelpCircle size={24} color={colors.jatraRed} />,
    color: colors.jatraRed,
    items: [
      "For any issue or confusion: Reach out to your team lead first.",
      "If needed, connect with the Team Devasthali core team.",
      "You're not expected to handle everything alone—we're here as a team."
    ]
  },
  {
    title: "A Small Reminder",
    icon: <Bell size={24} color={colors.jatraGreen} />,
    color: colors.jatraGreen,
    items: [
      "Stay committed to what you take up.",
      "Inform in advance if something changes.",
      "Be mindful of resources and respectful of the culture we're celebrating."
    ]
  }
];

// --- Main Component ---
export default function Register() {
  const [formData, setFormData] = useState({ 
    name: '', contact: '', email: '', occupation: '', gender: '',
    jatraTeam: 'Yes', priorExperience: '', responsibility: '', medicalCondition: '',
    areas: [] as string[], contribution: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal & Undertaking State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [undertaking, setUndertaking] = useState({
    level: 0,
    agree1: false,
    agree2: false
  });

  const isUndertakingComplete = undertaking.level > 0 && undertaking.agree1 && undertaking.agree2;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string, e: React.MouseEvent) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleArea = (area: string, e: React.MouseEvent) => {
    e.preventDefault();
    setFormData((prev) => {
      const current = prev.areas;
      if (current.includes(area)) {
        return { ...prev, areas: current.filter(a => a !== area) };
      } else {
        return { ...prev, areas: [...current, area] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUndertakingComplete) {
      alert("Please complete the Undertaking form first!");
      setIsModalOpen(true);
      return;
    }

    setIsSubmitting(true);

    const submissionData = {
      ...formData,
      level: undertaking.level 
    };

    try {
      const response = await fetch('https://jatrafestival.in/api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (result.status === 'success') {
        alert(`Registration Complete!\nWelcome to the team, ${formData.name}. Please check your email for the WhatsApp link and guidelines.`);
        
        // Reset state after success
        setFormData({ 
          name: '', contact: '', email: '', occupation: '', gender: '', 
          jatraTeam: 'Yes', priorExperience: '', responsibility: '', medicalCondition: '', 
          areas: [], contribution: '' 
        });
        setUndertaking({ level: 0, agree1: false, agree2: false });
        
      } else if (result.status === 'duplicate') {
        alert("Registration Failed: " + result.message);
      } else {
        alert("Server Error: " + result.message);
      }
    } catch (error) {
      alert("Network Error: Could not connect to the server.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      
      {/* 1. REGISTRATION FORM CARD */}
      <MainCard>
        <LeftPanel>
          <LeftContent>
            <LogoText>JATRA <span>FESTIVAL</span></LogoText>
            <MainHeading>Volunteer Registration</MainHeading>
            <SubHeading>Join the Kasar Jatra 2026 organizing team. Be part of a cultural revival and help us create something extraordinary.</SubHeading>
          </LeftContent>
        </LeftPanel>

        <RightPanel>
          <form onSubmit={handleSubmit}>
            <FormHeader>
              <FormTitle>Join the Core Team</FormTitle>
              <FormSubtitle>Fill out the details below to officially apply as a volunteer.</FormSubtitle>
            </FormHeader>

            {/* Section 1: Basic Info */}
            <FormSection>
              <SectionLabel>Personal Details <span>*</span></SectionLabel>
              <InputGrid>
                <StyledInput name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required />
                <StyledInput name="contact" type="tel" placeholder="Contact Number" value={formData.contact} onChange={handleInputChange} required />
                <StyledInput name="email" type="email" placeholder="Email ID" value={formData.email} onChange={handleInputChange} required />
                <StyledInput name="occupation" placeholder="Occupation" value={formData.occupation} onChange={handleInputChange} required />
                <StyledSelect name="gender" value={formData.gender} onChange={handleInputChange} required>
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </StyledSelect>
              </InputGrid>
            </FormSection>

            {/* Section 2: Experience & Mindset */}
            <FormSection>
              <SectionLabel>Experience & Mindset <span>*</span></SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <SectionSubLabel>Have you been part of any event/team before? If yes, describe your role.</SectionSubLabel>
                  <StyledTextArea name="priorExperience" value={formData.priorExperience} onChange={handleInputChange} required />
                </div>
                <div>
                  <SectionSubLabel>How do you usually handle responsibility and deadlines?</SectionSubLabel>
                  <StyledTextArea name="responsibility" value={formData.responsibility} onChange={handleInputChange} required />
                </div>
                <div>
                  <SectionSubLabel>Do you have any medical condition? If yes, please specify.</SectionSubLabel>
                  <StyledTextArea name="medicalCondition" value={formData.medicalCondition} onChange={handleInputChange} placeholder="Type 'None' if not applicable" required />
                </div>
              </div>
            </FormSection>

            {/* Section 3: Roles & Contribution */}
            <FormSection>
              <SectionLabel>Roles & Contribution <span>*</span></SectionLabel>
              
              <SectionSubLabel>Do you wish to be part of the core Jatra Team?</SectionSubLabel>
              <ToggleGroup>
                {['Yes', 'No'].map(opt => (
                  <ToggleBtn key={opt} selected={formData.jatraTeam === opt} onClick={(e) => handleRadioChange('jatraTeam', opt, e)}>
                    {opt}
                  </ToggleBtn>
                ))}
              </ToggleGroup>

              <SectionSubLabel style={{ marginTop: '15px' }}>What is your Preferred Area of Contribution?</SectionSubLabel>
              <PillGroup style={{ marginBottom: '20px' }}>
                {contributionAreas.map(area => (
                  <PillButton key={area} selected={formData.areas.includes(area)} onClick={(e) => toggleArea(area, e)}>
                    {area}
                  </PillButton>
                ))}
              </PillGroup>

              <SectionSubLabel>How will you contribute to the team? (Your strengths/skills)</SectionSubLabel>
              <StyledTextArea name="contribution" value={formData.contribution} onChange={handleInputChange} required />
            </FormSection>

            {/* Section 4: Undertaking & Submit */}
            <FormSection style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
              <UndertakingBtn type="button" complete={isUndertakingComplete} onClick={() => setIsModalOpen(true)}>
                {isUndertakingComplete ? (
                  <><Check size={20} /> Undertaking Completed</>
                ) : (
                  <><FileSignature size={20} /> Read & Sign Undertaking (Required)</>
                )}
              </UndertakingBtn>

              <SubmitButton type="submit" disabled={!isUndertakingComplete || isSubmitting}>
                {isSubmitting ? 'Registering...' : 'Confirm Registration'}
              </SubmitButton>
            </FormSection>

          </form>
        </RightPanel>
      </MainCard>

      {/* 2. GUIDELINES SECTION (NEW) */}
      <GuidelinesContainer>
        <SectionHeader>
          <h2>Volunteer Guidelines</h2>
          <p>Please read through our expectations and culture before joining the team.</p>
        </SectionHeader>

        <GuidelinesGrid>
          {guidelineData.map((data, index) => (
            <GuidelineCard key={index} borderTopColor={data.color}>
              <CardHead>
                {data.icon}
                <h3>{data.title}</h3>
              </CardHead>
              <GuidelineList>
                {data.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </GuidelineList>
            </GuidelineCard>
          ))}
        </GuidelinesGrid>

        <ConclusionBox>
          <p>
            We're creating something together with effort, intention, and a lot of heart.<br />
            So work sincerely, stay open, and don't forget to enjoy the journey along the way.
          </p>
          <h4><Heart color={colors.jatraRed} fill={colors.jatraRed} /> Welcome to Jatra, The Kasar festival!</h4>
        </ConclusionBox>
      </GuidelinesContainer>

      {/* MODAL: Undertaking Form */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalCard>
            <ModalHeader>
              <h3><AlertCircle size={20}/> Undertaking Form</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={20}/></button>
            </ModalHeader>

            <ModalBody>
              <div>
                <SectionLabel style={{ textAlign: 'center' }}>Commitment Level (1 = Not sure, 5 = Fully committed)</SectionLabel>
                <LevelContainer>
                  {[1, 2, 3, 4, 5].map(num => (
                    <LevelBtn 
                      key={num} 
                      type="button"
                      active={undertaking.level === num}
                      onClick={() => setUndertaking(p => ({ ...p, level: num }))}
                    >
                      {num}
                    </LevelBtn>
                  ))}
                </LevelContainer>
              </div>

              <CheckRow checked={undertaking.agree1} onClick={() => setUndertaking(p => ({ ...p, agree1: !p.agree1 }))}>
                <CheckBox checked={undertaking.agree1}>
                  {undertaking.agree1 && <Check size={16} color="#fff" />}
                </CheckBox>
                <p>"I understand that being a part of Jatra means taking full responsibility. I will stay committed throughout the process and will not back off once assigned a role. I will communicate properly, respect deadlines, and work as a team."</p>
              </CheckRow>

              <CheckRow checked={undertaking.agree2} onClick={() => setUndertaking(p => ({ ...p, agree2: !p.agree2 }))}>
                <CheckBox checked={undertaking.agree2}>
                  {undertaking.agree2 && <Check size={16} color="#fff" />}
                </CheckBox>
                <p>"I confirm that my parents/guardians are aware of my involvement in this event, and I take full responsibility for managing my time and commitment."</p>
              </CheckRow>
            </ModalBody>

            <ModalFooter>
              <SaveBtn type="button" onClick={() => setIsModalOpen(false)}>Save & Close</SaveBtn>
            </ModalFooter>
          </ModalCard>
        </ModalOverlay>
      )}

    </PageWrapper>
  );
}