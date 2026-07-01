import Navbar from '@/components/layout/Navbar';
import Container from '@/components/layout/Container';
import Hero from '@/components/home/Hero';
import CurrentReading from '@/components/home/CurrentReading';
import RecentNotes from '@/components/home/RecentNotes';
import Footer from '@/components/layout/Footer';

export default function Home(){
  return (
    <>
      <Navbar/>
      <Container>
        <Hero/>
        <CurrentReading/>
        <RecentNotes/>
      </Container>
      <Footer/>
    </>
  );
}