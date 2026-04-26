import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

// --- Asset Imports based on your folder structure ---
// Adjust the relative path '../' if your component is nested deeper in the src folder.
import day1Img from '../assets/events/day1-aipan.jpg';
import day2Img from '../assets/events/day2-competitions.jpg';
import day3Img from '../assets/events/day3-stage.jpg';
import day4Img from '../assets/events/day4-jhoda.jpg';
import day5Img from '../assets/events/day5-finale.jpg';
import jatraLogo from '../assets/jatra-logo.png';
import fallbackBg from '../assets/KASAR-BG-WEB.png';

// --- Official Color Palette ---
const colors = {
  primaryRed: '#ff3600',
  activeYellow: '#ffcc00', 
  primaryBlue: '#0087d9',  
  primaryDarkBlue: '#00568b', 
  textLight: '#ffffff',
  textDark: '#1a1a1a',
};

// --- Animations ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const backgroundFade = keyframes`
  from { opacity: 0.7; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// --- Festival Data Structure ---
const festivalData = [
  {
    id: 0,
    subtitle: "Day 1",
    title: "GRAND OPENING",
    description: "Jatra – The Beginning. Morning Pooja at Kasar Devi, Grand Aipan Creation, and competitions kickoff.",
    mainBgImage: day1Img,
    thumbImage: day1Img,
    events: [
      "Morning Pooja at Kasar Devi Temple with Core Team",
      "Grand Opening: Jatra – The Beginning (Local People, Choliya, MTB, Paragliders, Volunteers)",
      "Mangal & Shakuna Geet",
      "Aiming for World Record : Grand Aipan Creation",
      "Para trails and heats - 3PM ONWARDS",
      "Aipan Competition Begins",
      "Photography & Reel Competitions (ongoing, results Day 4)",
      "Panel Discussion: “Jatra Festival — Why?”",
      "Kamla Devi Performance",
      "Aipan Results & Prize Distribution"
    ]
  },
  {
    id: 1,
    subtitle: "Day 2",
    title: "COMPETITIONS DAY",
    description: "A day filled with adrenaline and creativity. Featuring MTB races, culinary arts, and the Upreti Sisters Live Show.",
    mainBgImage: day2Img,
    thumbImage: day2Img,
    events: [
      "MTB Race (para stdby) - 8:30AM ONWARDS",
      "Culinary Competition",
      "Painting Competition",
      "Fashion Show Competition",
      "Panel Discussion – Fashion: Modern + Traditional",
      "Evening: Upreti Sisters Live Show",
      "Results & Prize Announcement of the Day's Competitions"
    ]
  },
  {
    id: 2,
    subtitle: "Day 3",
    title: "SUSTAINABILITY & STAGE",
    description: "Celebrating eco-friendly innovation and local talent with trail running, open stages, and folk performances.",
    mainBgImage: day3Img,
    thumbImage: day3Img,
    events: [
      "Trail running (MTB stdby) - 8:30AM ONWARDS",
      "Sustainable Craft Competition promoting eco friendly innovation",
      "Open Stage for performers to showcase music, poetry, and talent",
      "Stand-up featuring Shiromani Pant",
      "Haldwani Wali Aunty (Rashi Joshi)",
      "Folk Performances by Basanti Devi",
      "Evening by Lalit Mohan Joshi or Digvijay",
      "Announcement of competition results"
    ]
  },
  {
    id: 3,
    subtitle: "Day 4",
    title: "JHODA CHANCHARI",
    description: "Aiming for a World Record with maximum public participation in the Jhoda Chanchari gathering.",
    mainBgImage: day4Img,
    thumbImage: day4Img,
    events: [
      "Half Marathon, Para gliding finals (trail stdby) - 6:30AM ONWARDS",
      "Aiming for World Record : Jhoda Chanchari Gathering with Live Music by Shiromani Pant",
      "Refreshments",
      "Panel Discussion: “Lok Nritya”",
      "Photography & Reel Making Competition Results",
      "Evening: Devasthali Dance Performance"
    ]
  },
  {
    id: 4,
    subtitle: "Day 5",
    title: "GRAND FINALE",
    description: "The spectacular conclusion featuring Tug of War, Dhol Samvad, and a record-breaking Pichodi creation.",
    mainBgImage: day5Img,
    thumbImage: day5Img,
    events: [
      "Tug of War – Male, Female & Children Categories",
      "Dhol Samvad – Cultural Showcase",
      "Aiming for World Record : Creating Pichodi with maximum people parcipation",
      "Para display( para finals stdby) - 3PM ONWARDS",
      "Janjati Cultural Performance",
      "Introduction of the Organization – Devasthali X Kartavya karma",
      "Vote of Thanks",
      "Devasthali Live Music Performance (Closing Act)"
    ]
  },
];

// --- Styled Components ---

const PageContainer = styled.div<{ bgImage: string }>`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url(${props => props.bgImage || fallbackBg});
  background-size: cover;
  background-position: center;
  color: ${colors.textLight};
  font-family: 'Open Sans', sans-serif;
  overflow: hidden;
  transition: background-image 0.8s ease-in-out;
  animation: ${backgroundFade} 1s ease-in-out;
`;

const PageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Darkened slightly for better text contrast */
`;

// --- Header ---
const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  background-color: transparent;
  z-index: 100;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 2px;
  color: ${colors.activeYellow};
`;

const LogoIcon = styled.img`
  height: 35px;
  margin-right: 15px;
  object-fit: contain;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 30px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const NavLink = styled.a`
  color: ${colors.textLight};
  text-decoration: none;
  transition: color 0.3s;
  &:hover {
    color: ${colors.activeYellow};
  }
`;

// --- Main Content ---
const MainContent = styled.main`
  position: relative;
  display: flex;
  justify-content: space-between;
  
  /* CHANGED: Switched from center to flex-end to shift everything lower */
  align-items: flex-end; 
  /* CHANGED: Increased bottom padding to prevent overlap with BottomControls */
  padding: 100px 60px 140px; 
  
  height: 100vh;
  z-index: 10;
`;

const HeroContent = styled.div`
  flex: 1;
  max-width: 45%;
  animation: ${fadeIn} 0.8s ease-in-out;
`;

const ContentDivider = styled.div`
  width: 40px;
  height: 3px;
  background-color: ${colors.activeYellow};
  margin-bottom: 20px;
`;

const SubtitleDetail = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.activeYellow};
  text-transform: uppercase;
  margin-bottom: 10px;
  letter-spacing: 2px;
`;

const Headline = styled.h1`
  font-size: 60px;
  font-weight: 900;
  line-height: 1.1;
  text-transform: uppercase;
  margin-bottom: 20px;
  text-shadow: 2px 2px 10px rgba(0,0,0,0.5);
`;

const Description = styled.p`
  font-size: 14px;
  color: #eeeeee;
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 90%;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const DiscoveryButton = styled.button`
  background: ${colors.primaryRed};
  border: 1px solid ${colors.primaryRed};
  border-radius: 30px;
  padding: 12px 30px;
  color: ${colors.textLight};
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 54, 0, 0.4);

  &:hover {
    background: transparent;
    color: ${colors.primaryRed};
  }
`;

// --- Slider ---
const DestinationsSlider = styled.div`
  display: flex;
  gap: 20px;
  
  /* CHANGED: Added 20px horizontal padding to fix the clipped corner glitch.
     This gives the scaled (1.15) active card room to expand without getting cut off. */
  padding: 40px 20px; 
  
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const DestinationCard = styled.div<{ active?: boolean }>`
  position: relative;
  width: 150px;
  height: 240px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
  box-shadow: 0 4px 10px rgba(0,0,0,0.5);
  border: 2px solid transparent;

  ${props => props.active && css`
    transform: scale(1.15);
    box-shadow: 0 10px 30px rgba(255, 204, 0, 0.4);
    border-color: ${colors.activeYellow};
    z-index: 5;
  `}
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60%;
  background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%);
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  width: calc(100% - 30px);
`;

const CardSubtitle = styled.div`
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${colors.activeYellow};
  margin-bottom: 4px;
`;

const CardTitle = styled.h3`
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  margin: 0;
  line-height: 1.2;
`;

// --- Modal Popup ---
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div`
  background-color: ${colors.textDark};
  border-radius: 16px;
  width: 100%;
  max-width: 650px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
  border: 1px solid #333;
  animation: ${slideUp} 0.4s ease-out;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: ${colors.textDark}; }
  &::-webkit-scrollbar-thumb { background: ${colors.activeYellow}; border-radius: 3px; }
`;

const ModalHeader = styled.div`
  padding: 25px 30px;
  border-bottom: 1px solid #333;
  position: sticky;
  top: 0;
  background-color: ${colors.textDark};
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 800;
  color: ${colors.activeYellow};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CloseIcon = styled.button`
  background: none;
  border: none;
  color: #aaa;
  font-size: 28px;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover { color: ${colors.primaryRed}; }
`;

const ModalBody = styled.div`
  padding: 30px;
`;

const EventList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const EventItem = styled.li`
  position: relative;
  padding-left: 25px;
  margin-bottom: 15px;
  font-size: 15px;
  line-height: 1.5;
  color: #ddd;

  &::before {
    content: '→';
    position: absolute;
    left: 0;
    top: 0;
    color: ${colors.primaryBlue};
    font-weight: bold;
  }
`;

// --- Bottom Controls ---
const BottomControls = styled.div`
  position: absolute;
  bottom: 60px;
  right: 60px;
  display: flex;
  gap: 20px;
  align-items: center;
  z-index: 100;
`;

const SliderIndicators = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const IndicatorLine = styled.div<{ active?: boolean }>`
  width: ${props => props.active ? '24px' : '12px'};
  height: 3px;
  background-color: ${props => props.active ? colors.activeYellow : 'rgba(255, 255, 255, 0.3)'};
  transition: width 0.3s ease, background-color 0.3s ease;
  border-radius: 2px;
`;

const SlideNumber = styled.div`
  font-size: 28px;
  font-weight: 900;
  color: ${colors.textLight};
`;

// --- Main Page Component ---
const InteractiveJatraFestival: React.FC = () => {
  const [currentDestIndex, setCurrentDestIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentData = festivalData[currentDestIndex];

  return (
    <PageContainer bgImage={currentData.mainBgImage}>
      <PageOverlay />

      {/* --- Header (Navbar) --- */}
      {/* Uncommented to match your requirements and allow future navigation updates
      <Header>
        <LogoContainer>
          <LogoIcon src={jatraLogo} alt="Jatra Logo" />
          JATRA FESTIVAL
        </LogoContainer>
        <NavLinks>
          <NavLink href="#home">HOME</NavLink>
          <NavLink href="#schedule">SCHEDULE</NavLink>
          <NavLink href="#guests">GUESTS</NavLink>
          <NavLink href="#gallery">GALLERY</NavLink>
          <NavLink href="#register">REGISTER</NavLink>
        </NavLinks>
      </Header> 
      */}

      {/* --- Main Hero Content --- */}
      <MainContent>
        <HeroContent key={currentDestIndex}>
          <ContentDivider />
          <SubtitleDetail>{currentData.subtitle}</SubtitleDetail>
          <Headline>{currentData.title}</Headline>
          <Description>{currentData.description}</Description>
          <ButtonGroup>
            <DiscoveryButton onClick={() => setIsModalOpen(true)}>
              VIEW DAY SCHEDULE
            </DiscoveryButton>
          </ButtonGroup>
        </HeroContent>

        {/* --- Interactive Slider --- */}
        <DestinationsSlider>
          {festivalData.map((dest, index) => (
            <DestinationCard 
              key={dest.id}
              active={index === currentDestIndex}
              onClick={() => setCurrentDestIndex(index)}
            >
              <CardImage src={dest.thumbImage} alt={dest.title} />
              <CardOverlay />
              <CardContent>
                <CardSubtitle>{dest.subtitle}</CardSubtitle>
                <CardTitle>{dest.title}</CardTitle>
              </CardContent>
            </DestinationCard>
          ))}
        </DestinationsSlider>
      </MainContent>

      {/* --- Bottom Controls --- */}
      <BottomControls>
        <SliderIndicators>
          {festivalData.map((_, index) => (
            <IndicatorLine key={index} active={index === currentDestIndex} />
          ))}
        </SliderIndicators>
        <SlideNumber>0{currentDestIndex + 1}</SlideNumber>
      </BottomControls>

      {/* --- Modal Popup Component --- */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{currentData.subtitle}: {currentData.title}</ModalTitle>
              <CloseIcon onClick={() => setIsModalOpen(false)}>&times;</CloseIcon>
            </ModalHeader>
            <ModalBody>
              <EventList>
                {currentData.events.map((event, i) => (
                  <EventItem key={i}>{event}</EventItem>
                ))}
              </EventList>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default InteractiveJatraFestival;