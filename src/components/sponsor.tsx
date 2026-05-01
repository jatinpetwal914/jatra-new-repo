import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// --- Official Color Palette & Animations ---
const colors = {
  primaryRed: '#ff3600',
  activeYellow: '#ffcc00',
  primaryBlue: '#0087d9',
  primaryDarkBlue: '#00568b',
  textLight: '#ffffff',
  textDark: '#1a1a1a',
  bgGray: '#f4f5f7',
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// --- Styled Components ---
const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, ${colors.textDark} 0%, ${colors.primaryDarkBlue} 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  font-family: 'Open Sans', 'Segoe UI', sans-serif;
  @media (max-width: 768px) { padding: 20px 10px; align-items: flex-start; }
`;

const MainCard = styled.div`
  display: flex; width: 100%; max-width: 1100px; height: 85vh; background: #ffffff;
  border-radius: 24px; box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5); overflow: hidden;
  animation: ${fadeIn} 0.8s ease-out;
  @media (max-width: 768px) { flex-direction: column; height: auto; min-height: 90vh; }
`;

const LeftPanel = styled.div`
  flex: 0 0 45%; background-color: ${colors.primaryDarkBlue}; background-size: cover; background-position: center;
  position: relative; padding: 50px 40px; display: flex; flex-direction: column; justify-content: space-between; color: ${colors.textLight};
  &::before { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%); }
  @media (max-width: 768px) { flex: 0 0 auto; height: 300px; padding: 30px 20px; }
`;

const LeftContent = styled.div`position: relative; z-index: 1;`;
const LogoText = styled.h2`font-size: 24px; font-weight: 800; color: ${colors.textLight}; margin-bottom: 40px; display: flex; align-items: center; gap: 10px; span { color: ${colors.activeYellow}; } @media (max-width: 768px) { margin-bottom: 20px; font-size: 20px; }`;
const MainHeading = styled.h1`font-size: 42px; font-weight: 800; line-height: 1.2; margin-bottom: 15px; @media (max-width: 768px) { font-size: 28px; }`;
const SubHeading = styled.p`font-size: 16px; color: #dddddd; margin-bottom: 30px;`;

const RightPanel = styled.div`
  flex: 1; padding: 50px 60px; overflow-y: auto; background: #ffffff;
  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }
  &::-webkit-scrollbar-thumb:hover { background: ${colors.primaryBlue}; }
  @media (max-width: 768px) { padding: 30px 20px; overflow-y: visible; }
`;

const FormHeader = styled.div`margin-bottom: 30px;`;
const FormTitle = styled.h2`font-size: 28px; font-weight: 800; color: ${colors.textDark}; margin-bottom: 8px;`;
const FormSubtitle = styled.p`font-size: 14px; color: #666;`;
const FormSection = styled.div`margin-bottom: 25px;`;
const SectionLabel = styled.label`display: block; font-size: 14px; font-weight: 700; color: ${colors.textDark}; margin-bottom: 10px; span { color: ${colors.primaryRed}; }`;
const InputGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 15px; @media (max-width: 768px) { grid-template-columns: 1fr; }`;

const StyledInput = styled.input`
  width: 100%; padding: 14px 18px; background-color: ${colors.bgGray}; border: 2px solid transparent;
  border-radius: 12px; font-size: 14px; color: ${colors.textDark}; outline: none; transition: all 0.3s;
  &:focus { background-color: #fff; border-color: ${colors.primaryBlue}; box-shadow: 0 4px 12px rgba(0, 135, 217, 0.1); }
  &::placeholder { color: #999; }
`;

const StyledSelect = styled.select`
  width: 100%; padding: 14px 18px; background-color: ${colors.bgGray}; border: 2px solid transparent;
  border-radius: 12px; font-size: 14px; color: ${colors.textDark}; outline: none; cursor: pointer; appearance: none;
  &:focus { background-color: #fff; border-color: ${colors.primaryBlue}; }
`;

const StyledTextArea = styled.textarea`
  width: 100%; padding: 14px 18px; background-color: ${colors.bgGray}; border: 2px solid transparent;
  border-radius: 12px; font-size: 14px; color: ${colors.textDark}; outline: none; resize: vertical; min-height: 100px; transition: all 0.3s;
  &:focus { background-color: #fff; border-color: ${colors.primaryBlue}; }
`;

const PillGroup = styled.div`display: flex; flex-wrap: wrap; gap: 10px;`;
const PillButton = styled.button<{ selected: boolean }>`
  padding: 10px 20px; border-radius: 30px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s;
  background-color: ${props => props.selected ? colors.primaryDarkBlue : colors.bgGray};
  color: ${props => props.selected ? '#fff' : '#555'};
  border: 1px solid ${props => props.selected ? colors.primaryDarkBlue : 'transparent'};
  &:hover { background-color: ${props => props.selected ? colors.primaryDarkBlue : '#e2e5e9'}; }
`;

const OptionalText = styled.span`font-size: 12px; font-weight: 400; color: #888; margin-left: 5px;`;
const SubmitButton = styled.button`
  width: 100%; padding: 16px; background-color: ${colors.primaryRed}; color: #fff; font-size: 16px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px; border: none; border-radius: 12px; cursor: pointer; transition: all 0.3s; box-shadow: 0 8px 20px rgba(255, 54, 0, 0.3); margin-top: 10px;
  &:hover { background-color: #e63000; transform: translateY(-2px); box-shadow: 0 10px 25px rgba(255, 54, 0, 0.4); }
  &:disabled { background-color: #ccc; cursor: not-allowed; transform: none; box-shadow: none; }
`;

const SuccessContainer = styled.div`display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; height: 100%; animation: ${fadeIn} 0.5s ease-out;`;
const SuccessIcon = styled.div`width: 80px; height: 80px; background-color: ${colors.activeYellow}; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-bottom: 24px; font-size: 40px;`;
const SuccessTitle = styled.h2`font-size: 32px; font-weight: 800; color: ${colors.textDark}; margin-bottom: 15px;`;
const SuccessText = styled.p`font-size: 16px; color: #555; margin-bottom: 40px; line-height: 1.6; max-width: 80%;`;
const WhatsappButton = styled.a`
  display: inline-flex; align-items: center; gap: 10px; padding: 15px 30px; background-color: #25D366; color: #fff;
  text-decoration: none; font-size: 15px; font-weight: 700; border-radius: 30px; transition: all 0.3s; box-shadow: 0 8px 20px rgba(37, 211, 102, 0.3);
  &:hover { background-color: #1ebe5d; transform: translateY(-2px); }
`;

// --- Main Component Implementation ---
const SponsorPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 1. Setup State for the Form
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    organization: '',
    category: '',
    contributionDetails: '',
    reason: '',
    link: '',
    approxValue: ''
  });

  const [collabTypes, setCollabTypes] = useState<string[]>([]);

  const collaborationOptions = [
    "Monetary Sponsorship",
    "Service Support",
    "Product Collaboration",
    "Media / Promotion",
    "Other"
  ];

  // 2. Handle Text Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleCollabType = (type: string, e: React.MouseEvent) => {
    e.preventDefault(); 
    setCollabTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // 3. Submit to PHP API (Handles DB Save AND Auto-Email)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (collabTypes.length === 0) {
        alert("Please select at least one Type of Collaboration.");
        return;
    }

    setIsSubmitting(true);

    const submissionData = {
        ...formData,
        collabTypes: collabTypes
    };

    try {
        // Send ONE request to the server. The PHP file will handle saving and emailing.
        const response = await fetch('https://jatrafestival.in/api/sponsor_register.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submissionData),
        });

        const result = await response.json();

        if (result.status === 'success') {
            setIsSubmitted(true);
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
      <MainCard>
        
        <LeftPanel>
          <LeftContent>
            <LogoText>JATRA <span>FESTIVAL</span></LogoText>
            <MainHeading>Partner With Jatra</MainHeading>
            <SubHeading>Be part of a cultural revival. Let's create something extraordinary together.</SubHeading>
             <img src="/src/assets/jatra-wordmark.png"></img> 
          </LeftContent>
        </LeftPanel>

        <RightPanel>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <FormHeader>
                <FormTitle>Join the Movement</FormTitle>
                <FormSubtitle>Tell us how you want to collaborate with Jatra.
                </FormSubtitle>
              </FormHeader>

              <FormSection>
                <SectionLabel>Basic Details <span>*</span></SectionLabel>
                <InputGrid>
                  <StyledInput name="name" value={formData.name} onChange={handleInputChange} type="text" placeholder="Full Name *" required />
                  <StyledInput name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="Phone Number *" required />
                  <StyledInput name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="Email ID *" required />
                  <StyledInput name="organization" value={formData.organization} onChange={handleInputChange} type="text" placeholder="Organization / Brand Name *" required />
                </InputGrid>
              </FormSection>

              <FormSection>
                <SectionLabel>You Are? <span>*</span></SectionLabel>
                <StyledSelect name="category" value={formData.category} onChange={handleInputChange} required>
                  <option value="" disabled>Select your category</option>
                  <option value="brand">Brand / Company</option>
                  <option value="local_business">Local Business</option>
                  <option value="vendor">Vendor / Service Provider</option>
                  <option value="artist">Artist / Creator</option>
                  <option value="ngo">NGO / Community</option>
                </StyledSelect>
              </FormSection>

              <FormSection>
                <SectionLabel>Type of Collaboration <span>*</span></SectionLabel>
                <PillGroup>
                  {collaborationOptions.map(type => (
                    <PillButton
                      key={type}
                      type="button" 
                      selected={collabTypes.includes(type)}
                      onClick={(e) => toggleCollabType(type, e)}
                    >
                      {type}
                    </PillButton>
                  ))}
                </PillGroup>
              </FormSection>

              <FormSection>
                <SectionLabel>How would you like to contribute? <span>*</span></SectionLabel>
                <StyledTextArea 
                  name="contributionDetails"
                  value={formData.contributionDetails}
                  onChange={handleInputChange}
                  placeholder="E.g., Cash, Food, Stay, Transport, Media coverage, Equipment..." 
                  required 
                />
              </FormSection>

              <FormSection>
                <SectionLabel>Why do you want to be part of Jatra? <span>*</span></SectionLabel>
                <StyledTextArea 
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Share your vision and why our cultural revival resonates with you..." 
                  required 
                />
              </FormSection>

              <FormSection>
                <SectionLabel>Additional Info <OptionalText>(Optional)</OptionalText></SectionLabel>
                <InputGrid>
                  <StyledInput name="link" value={formData.link} onChange={handleInputChange} type="url" placeholder="Website / Instagram Link" />
                  <StyledInput name="approxValue" value={formData.approxValue} onChange={handleInputChange} type="text" placeholder="Approx Contribution Value (₹)" />
                </InputGrid>
              </FormSection>

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Join the Movement'}
              </SubmitButton>

            </form>
          ) : (
            <SuccessContainer>
              <SuccessIcon>✨</SuccessIcon>
              <SuccessTitle>Thank You!</SuccessTitle>
              <SuccessText>
                You’re now part of something bigger. Our team has received your application and will connect with you soon to discuss the collaboration.
              </SuccessText>
              <WhatsappButton href="https://wa.me/YOUR_NUMBER_HERE" target="_blank">
                Join our Partner WhatsApp Group
              </WhatsappButton>
            </SuccessContainer>
          )}
        </RightPanel>

      </MainCard>
    </PageWrapper>
  );
};

export default SponsorPage;