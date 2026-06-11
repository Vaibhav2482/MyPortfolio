import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AppBar,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import downloadCV from './assets/NewVaibhav.pdf';
import { useColorMode } from './context/ThemeContext';
import profileImage from './assets/Vaibhav.png';
import {
  navItems,
  heroStats,
  experienceItems,
  projects,
  skillSections,
  technologyTags,
  socialLinks,
} from './data';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: 'easeOut',
    },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.85,
      ease: 'easeOut',
    },
  },
};

function App() {
  const theme = useTheme();
  const { mode, toggleColorMode } = useColorMode();
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactFeedback, setContactFeedback] = useState('');

  const accent = theme.palette.primary.main;

  const heroQuote = useMemo(
    () =>
      'Currently building enterprise applications, REST APIs and modern digital experiences using ASP.NET Core, React, and SQL Server.',
    []
  );

  const processSteps = [
    { number: '01', title: 'Discovery', description: 'Understand goals, scope and target outcomes for every project.' },
    { number: '02', title: 'Planning', description: 'Define architecture, milestones and a practical delivery plan.' },
    { number: '03', title: 'Design', description: 'Craft interfaces that feel polished, usable, and brand-forward.' },
    { number: '04', title: 'Development', description: 'Build stable, maintainable systems with React and ASP.NET Core.' },
    { number: '05', title: 'Testing', description: 'Ensure quality with end-to-end validation and performance checks.' },
    { number: '06', title: 'Deployment', description: 'Launch with a reliable production-ready release process.' },
    { number: '07', title: 'Support', description: 'Provide continuity, monitoring and incremental improvements.' },
  ];

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'));

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      const currentSection = sections.reduce((closest, section) => {
        if (section.offsetTop <= scrollPosition) {
          return section.id;
        }
        return closest;
      }, 'home');

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const openContactDialog = () => {
    setContactFeedback('');
    setContactOpen(true);
  };

  const closeContactDialog = () => {
    setContactFeedback('');
    setContactOpen(false);
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    if (!contactName || !contactEmail || !contactMessage) {
      return;
    }

    const payload = {
      name: contactName,
      email: contactEmail,
      message: contactMessage,
      _subject: `[Portfolio Contact] ${contactName}`,
      _template: 'table',
    };

    try {
      const response = await fetch('https://formsubmit.co/ajax/vaibhavnawale2482@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setContactFeedback('Message sent successfully. I will get back to you shortly.');
        setContactName('');
        setContactEmail('');
        setContactMessage('');
      } else {
        setContactFeedback('Unable to send the message. Please try again or email me directly.');
      }
    } catch (error) {
      setContactFeedback('Unable to send the message. Please try again or email me directly.');
      console.error('Contact submit error:', error);
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: mode === 'light' ? '#FEF7EF' : '#02030B',
          borderBottom: `1px solid ${mode === 'light' ? '#E6D6C4' : '#11203A'}`,
          color: 'text.primary',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ py: 1.5, gap: 2, justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ width: 46, height: 46, borderRadius: 3, overflow: 'hidden', display: 'grid', placeItems: 'center', bgcolor: accent }}>
                <Box component="img" src={profileImage} alt="Vaibhav logo" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
              <Stack spacing={0.25}>
                <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 0.8 }}>
                  Vaibhav
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: 0.8 }}>
                  Full Stack .NET Developer
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
              {navItems.map((item) => {
                const sectionId = item.href.replace('#', '');
                if (item.href === '#contact') {
                  return (
                    <Button
                      key={item.href}
                      onClick={openContactDialog}
                      size="small"
                      sx={{
                        textTransform: 'none',
                        boxShadow: 'none',
                        color: activeSection === sectionId ? accent : 'text.secondary',
                        fontWeight: activeSection === sectionId ? 700 : 500,
                        fontSize: '0.95rem',
                        letterSpacing: 0.6,
                        transition: 'color 180ms ease',
                        '&:hover': { color: accent },
                      }}
                    >
                      {item.label}
                    </Button>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    underline="none"
                    sx={{
                      color: activeSection === sectionId ? accent : 'text.secondary',
                      fontWeight: activeSection === sectionId ? 700 : 500,
                      fontSize: '0.95rem',
                      letterSpacing: 0.6,
                      transition: 'color 180ms ease',
                      '&:hover': { color: accent },
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Button
                variant="contained"
                size="small"
                onClick={openContactDialog}
                sx={{ textTransform: 'none', boxShadow: 'none' }}
              >
                Contact
              </Button>
              <Button
                component="a"
                href={downloadCV}
                download="Vaibhav_Nawale_CV.pdf"
                variant="outlined"
                size="small"
                sx={{
                  textTransform: 'none',
                  boxShadow: 'none',
                  color: 'text.secondary',
                  borderColor: theme.palette.divider
                }}
              >
                Download CV
              </Button>
              <IconButton
                onClick={toggleColorMode}
                size="large"
                sx={{ border: `1px solid ${theme.palette.divider}` }}
              >
                {mode === 'light' ? <DarkModeIcon /> : <WbSunnyIcon />}
              </IconButton>
            </Stack>

            <IconButton
              onClick={toggleMobileMenu}
              size="large"
              sx={{ display: { xs: 'flex', md: 'none' }, border: `1px solid ${theme.palette.divider}` }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer open={mobileOpen} onClose={closeMobileMenu}>
        <Box sx={{ width: 280, p: 3, minHeight: '100vh', bgcolor: mode === 'light' ? '#FFFFFF' : '#02040B' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Menu
            </Typography>
            <IconButton onClick={closeMobileMenu} size="large">
              <CloseIcon />
            </IconButton>
          </Stack>

          <List>
            {navItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                {item.href === '#contact' ? (
                  <ListItemButton onClick={() => { openContactDialog(); closeMobileMenu(); }}>
                    <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 700 }} />
                  </ListItemButton>
                ) : (
                  <ListItemButton component="a" href={item.href} onClick={closeMobileMenu}>
                    <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 700 }} />
                  </ListItemButton>
                )}
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 3 }} />

          <Stack spacing={2}>
            <Button
              variant="outlined"
              component="a"SS
              href={downloadCV}
              download="Vaibhav_Nawale_CV.pdf"
            >
              Download CV
            </Button>
            <Button variant="outlined" onClick={() => { toggleColorMode(); closeMobileMenu(); }}>
              {mode === 'light' ? 'Dark mode' : 'Light mode'}
            </Button>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton component="a" href={socialLinks.github} target="_blank" rel="noreferrer">
                <GitHubIcon />
              </IconButton>
              <IconButton component="a" href={socialLinks.linkedin} target="_blank" rel="noreferrer">
                <LinkedInIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Box>
      </Drawer>

      <Dialog open={contactOpen} onClose={closeContactDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: mode === 'light' ? '#F5F0EB' : '#08101C', color: 'text.primary' }}>
          Contact Me
        </DialogTitle>
        <DialogContent sx={{ bgcolor: mode === 'light' ? '#FCF7F1' : '#07101B' }}>
          <Typography sx={{ mb: 2, color: 'text.secondary' }}>
            Send a message directly from the site and I will receive it in my inbox.
          </Typography>
          {contactFeedback && (
            <Typography sx={{ mb: 2, color: accent, fontWeight: 700 }}>
              {contactFeedback}
            </Typography>
          )}
          <Box component="form" onSubmit={handleContactSubmit} noValidate>
            <TextField
              label="Name"
              value={contactName}
              onChange={(event) => setContactName(event.target.value)}
              fullWidth
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
              sx={{ bgcolor: mode === 'light' ? '#FFFFFF' : '#0C1622' }}
            />
            <TextField
              label="Email"
              type="email"
              value={contactEmail}
              onChange={(event) => setContactEmail(event.target.value)}
              fullWidth
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
              sx={{ bgcolor: mode === 'light' ? '#FFFFFF' : '#0C1622' }}
            />
            <TextField
              label="Message"
              value={contactMessage}
              onChange={(event) => setContactMessage(event.target.value)}
              fullWidth
              margin="normal"
              required
              multiline
              rows={4}
              InputLabelProps={{ shrink: true }}
              sx={{ bgcolor: mode === 'light' ? '#FFFFFF' : '#0C1622' }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ bgcolor: mode === 'light' ? '#F5F0EB' : '#08101C' }}>
          <Button onClick={closeContactDialog} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleContactSubmit}
            variant="contained"
            disabled={!contactName || !contactEmail || !contactMessage}
            sx={{ textTransform: 'none' }}
          >
            Send Message
          </Button>
        </DialogActions>
      </Dialog>

      <Box component="section" id="home" sx={{ minHeight: '100vh', py: { xs: 6, md: 12 }, bgcolor: mode === 'light' ? '#FFFFFF' : '#04070E' }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
            <Grid item xs={12} lg={6}>
              <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                    mb: 3,
                    color: accent,
                    fontWeight: 700,
                  }}
                >
                  Accelerate. Build. Innovate. Rise. Achieve.
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '3.5rem', sm: '4.5rem', md: '5.25rem' },
                    lineHeight: 0.95,
                    letterSpacing: '-0.04em',
                    mb: 2,
                  }}
                >
                  VAIBHAV
                  <br />
                  NAWALE
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    color: mode === 'light' ? '#5F4A3B' : '#D8C2AA',
                    fontWeight: 700,
                  }}
                >
                  Full Stack .NET Developer building reliable software for modern teams.
                </Typography>
                <Typography sx={{ maxWidth: 620, color: 'text.secondary', mb: 5, fontSize: { xs: '1rem', md: '1.05rem' } }}>
                  {heroQuote}
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button variant="contained" size="large" href="#projects">
                    View Projects
                  </Button>
                  <Button variant="outlined" size="large" onClick={openContactDialog}>
                    Contact Me
                  </Button>
                </Stack>
              </motion.div>

              <Grid container spacing={2} sx={{ mt: 8 }}>
                {heroStats.map((stat) => (
                  <Grid item xs={12} sm={4} key={stat.label}>
                    <Card
                      elevation={0}
                      sx={{
                        p: 4,
                        borderRadius: 4,
                        bgcolor: mode === 'light' ? '#ffffff' : '#07101D',
                        border: `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: 800, color: accent }}>
                        {stat.value}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', mt: 1 }}>{stat.label}</Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12} lg={6}>
              <Box sx={{ position: 'relative', mx: 'auto', maxWidth: 520, mt: { xs: 4, lg: 0 } }}>
                <Box
                  sx={{
                    position: 'absolute',
                    width: 240,
                    height: 240,
                    borderRadius: '50%',
                    bgcolor: accent,
                    opacity: 0.2,
                    top: -36,
                    right: -36,
                    filter: 'blur(64px)',
                  }}
                />
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                >
                  <Box
                    component="img"
                    src={profileImage}
                    alt="Vaibhav Nawale"
                    sx={{
                      width: '100%',
                      height: { xs: 320, sm: 420, md: 520 },
                      objectFit: 'cover',
                      borderRadius: '2rem',
                      boxShadow: '0 40px 120px rgba(139, 94, 60, 0.16)',
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  />
                </motion.div>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
                  sx={{
                    position: 'absolute',
                    top: 24,
                    left: 0,
                    width: 170,
                    display: { xs: 'none', md: 'block' },
                  }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      border: `1px solid ${theme.palette.divider}`,
                      bgcolor: mode === 'light' ? '#FFFFFF' : '#07101D',
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ color: accent, fontWeight: 700, mb: 1 }}>
                      React.js
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Frontend interfaces
                    </Typography>
                  </Card>
                </Box>

                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
                  sx={{
                    position: 'absolute',
                    top: 24,
                    right: -14,
                    width: 170,
                    display: { xs: 'none', md: 'block' },
                  }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      border: `1px solid ${theme.palette.divider}`,
                      bgcolor: mode === 'light' ? '#FFFFFF' : '#07101D',
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ color: accent, fontWeight: 700, mb: 1 }}>
                      SQL Server
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Data systems
                    </Typography>
                  </Card>
                </Box>

                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 34 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
                  sx={{
                    position: 'absolute',
                    bottom: 24,
                    left: 0,
                    width: 170,
                    display: { xs: 'none', md: 'block' },
                  }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      border: `1px solid ${theme.palette.divider}`,
                      bgcolor: mode === 'light' ? '#FFFFFF' : '#07101D',
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ color: accent, fontWeight: 700, mb: 1 }}>
                      ASP.NET Core
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Backend architecture
                    </Typography>
                  </Card>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box component="section" id="about" sx={{ py: { xs: 8, md: 12 }, bgcolor: mode === 'light' ? '#FFFFFF' : '#060A14' }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
            <Grid item xs={12} md={5}>
              <motion.div initial="hidden" animate="visible" variants={fadeRight}>
                <Typography variant="h2" sx={{ fontWeight: 800, mb: 3 }}>
                  About the work
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 4, fontSize: '1.05rem' }}>
                  Practical software built for teams that need reliable delivery, clean product flows and a strong business impact.
                </Typography>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={7}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      border: `1px solid ${theme.palette.divider}`,
                      bgcolor: mode === 'light' ? '#FFFFFF' : '#07101D',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                      Who I am
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Full Stack .NET Developer creating production-ready web systems and enterprise APIs.
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      border: `1px solid ${theme.palette.divider}`,
                      bgcolor: mode === 'light' ? '#FFFFFF' : '#07101D',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                      What I deliver
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Scalable web applications, secure backend services and polished interfaces for business users.
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      border: `1px solid ${theme.palette.divider}`,
                      bgcolor: mode === 'light' ? '#FFFFFF' : '#07101D',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                      Where I work
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Abira Technologies Pvt. Ltd., focused on live projects, team delivery and real product outcomes.
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      border: `1px solid ${theme.palette.divider}`,
                      bgcolor: mode === 'light' ? '#FFFFFF' : '#07101D',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                      Where I am
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Chhatrapati Sambhajinagar, Maharashtra with a focus on practical, real-time software delivery.
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box component="section" id="experience" sx={{ py: { xs: 8, md: 12 }, bgcolor: mode === 'light' ? '#FFFFFF' : '#04070E' }}>
        <Container maxWidth="xl">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, textAlign: 'center' }}>
              How I work
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 8, textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
              A structured delivery process that combines strategic planning, polished UI, backend reliability and production-ready deployment.
            </Typography>
          </motion.div>

          <Grid container spacing={3}>
            {processSteps.map((step) => (
              <Grid item xs={12} md={4} key={step.number}>
                <Card
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    border: `1px solid ${theme.palette.divider}`,
                    bgcolor: mode === 'light' ? '#ffffff' : '#07101D',
                  }}
                >
                  <Stack spacing={2}>
                    <Typography variant="subtitle2" sx={{ color: accent, fontWeight: 700 }}>
                      {step.number}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      {step.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{step.description}</Typography>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box component="section" id="skills" sx={{ py: { xs: 8, md: 12 }, bgcolor: mode === 'light' ? '#FFFFFF' : '#060A14' }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 6, md: 8 }}>
            <Grid item xs={12} md={4}>
              <motion.div initial="hidden" animate="visible" variants={fadeRight}>
                <Typography variant="h2" sx={{ fontWeight: 800, mb: 3 }}>
                  Technologies we use
                </Typography>
                <Typography sx={{ color: 'text.secondary', maxWidth: 500 }}>
                  A practical stack for enterprise apps, backend services and polished frontend experiences.
                </Typography>
              </motion.div>
              <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 4 }}>
                {technologyTags.slice(0, 8).map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{ borderColor: theme.palette.divider, color: 'text.primary', fontWeight: 700 }}
                  />
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} md={8}>
              <Grid container spacing={3}>
                {skillSections.map((section) => (
                  <Grid item xs={12} md={4} key={section.title}>
                    <Card
                      elevation={0}
                      sx={{
                        p: 4,
                        borderRadius: 4,
                        border: `1px solid ${theme.palette.divider}`,
                        bgcolor: mode === 'light' ? '#ffffff' : '#07101D',
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                        {section.title}
                      </Typography>
                      <Stack spacing={1}>
                        {section.skills.map((skill) => (
                          <Typography key={skill} sx={{ color: 'text.secondary' }}>
                            • {skill}
                          </Typography>
                        ))}
                      </Stack>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box component="section" id="projects" sx={{ py: { xs: 8, md: 12 }, bgcolor: mode === 'light' ? '#FFFFFF' : '#081022' }}>
        <Container maxWidth="xl">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, textAlign: 'center' }}>
              Recent Projects
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 8, textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
              Case studies that emphasize practical business value, strong UX and reliable technical implementation.
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {projects.map((project) => (
              <Grid item xs={12} md={6} key={project.title}>
                <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.25 }}>
                  <Card
                    elevation={0}
                    sx={{
                      p: { xs: 4, md: 5 },
                      borderRadius: 4,
                      border: `1px solid ${theme.palette.divider}`,
                      bgcolor: mode === 'light' ? '#ffffff' : '#07101D',
                    }}
                  >
                    <Stack spacing={3}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
                        <Typography variant="h5" sx={{ fontWeight: 800 }}>{project.title}</Typography>
                        <Chip label={project.subtitle} size="small" sx={{ bgcolor: accent, color: '#fff', fontWeight: 700 }} />
                      </Stack>
                      <Typography sx={{ color: 'text.secondary' }}>{project.description}</Typography>
                      <Stack direction="row" flexWrap="wrap" gap={1}>
                        {project.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                            sx={{ borderColor: theme.palette.divider, color: 'text.primary' }}
                          />
                        ))}
                      </Stack>
                      <Typography sx={{ color: 'text.secondary', fontSize: '0.95rem' }}>{project.details}</Typography>
                      {project.liveUrl && (
                        <Button
                          component="a"
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          variant="contained"
                          size="small"
                          sx={{ alignSelf: 'flex-start', textTransform: 'none' }}
                        >
                          View Live
                        </Button>
                      )}
                    </Stack>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box component="section" id="contact" sx={{ py: { xs: 8, md: 12 }, bgcolor: mode === 'light' ? '#FFFFFF' : '#02030B' }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" sx={{ fontWeight: 800, mb: 3 }}>
                Let’s build something practical and scalable.
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 4, maxWidth: 560 }}>
                Ready to accelerate your next project with dependable engineering, polished interfaces and business-ready delivery.
              </Typography>
              <Stack spacing={2}>
                <Typography fontWeight={700}>📧 vaibhavnawale2482@gmail.com</Typography>
                <Typography fontWeight={700}>📱 +91 9405672482</Typography>
                <Typography fontWeight={700}>📍 Chhatrapati Sambhajinagar, Maharashtra</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <IconButton
                    component="a"
                    href={socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                    sx={{
                      color: 'text.secondary',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                  >
                    <GitHubIcon />
                  </IconButton>

                  <IconButton
                    component="a"
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    sx={{
                      color: 'text.secondary',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: mode === 'light' ? '#ffffff' : '#07101D',
                }}
              >
                <Stack spacing={3}>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    Let’s connect
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    Send a message to discuss your project, timeline and how I can help build the right solution.
                  </Typography>
                  <Button size="large" variant="contained" onClick={openContactDialog}>
                    Email me
                  </Button>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box component="footer" sx={{ py: 10, bgcolor: '#02040B', color: '#F8FAFC' }}>
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: accent }}>
                Vaibhav Nawale
              </Typography>
              <Typography sx={{ color: 'text.secondary', maxWidth: 380 }}>
                Building practical enterprise applications with a focus on delivery, performance and professional product design.
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2 }}>
                Pages
              </Typography>
              <Stack spacing={1}>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    underline="none"
                    sx={{ color: 'text.secondary', '&:hover': { color: accent } }}
                  >
                    {item.label}
                  </Link>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2 }}>
                Contact
              </Typography>
              <Stack spacing={1}>
                <Typography sx={{ color: 'text.secondary' }}>📧 vaibhavnawale2482@gmail.com</Typography>
                <Typography sx={{ color: 'text.secondary' }}>📱 +91 9405672482</Typography>
                <Typography sx={{ color: 'text.secondary' }}>📍 Chhatrapati Sambhajinagar, Maharashtra</Typography>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 6, borderColor: 'rgba(255,255,255,0.08)' }} />

          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography sx={{ color: 'text.secondary' }}>
                © {new Date().getFullYear()} Designed & Developed with ❤️ by Vaibhav Nawale
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
