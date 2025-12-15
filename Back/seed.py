from app import app, db
from models import Catch, Species


def seed_database():
    db.drop_all()
    db.create_all()

    def create_fish():
        LMbass = Species(
            name="Largemouth Bass",
            description="A freshwater gamefish known for its large mouth and aggressive behavior.",
        )
        Rtrout = Species(
            name="Rainbow Trout",
            description="A popular freshwater fish known for its vibrant colors and fighting spirit.",
        )
        Btrout = Species(
            name="Brown Trout",
            description="A species of trout known for its brownish color and adaptability to various habitats.",
        )
        Brookie = Species(
            name="Brook Trout",
            description="A species of freshwater fish native to Eastern North America, known for its distinctive markings.",
        )
        Ccarp = Species(
            name="Common Carp",
            description="A widespread freshwater fish known for its size and adaptability.",
        )
        SMbass = Species(
            name="Smallmouth Bass",
            description="A freshwater fish known for its fighting ability and preference for cooler waters.",
        )
        Bgill = Species(
            name="Bluegill",
            description="A species of freshwater fish known for its distinctive blue coloring and popularity among anglers.",
        )
        Pseed = Species(
            name="Pumpkinseed",
            description="A small freshwater fish known for its bright colors and sunfish family characteristics.",
        )
        Crappie = Species(
            name="Crappie",
            description="A popular freshwater fish known for its tasty flesh and schooling behavior.",
        )
        Npike = Species(
            name="Northern Pike",
            description="A carnivorous freshwater fish known for its elongated body and sharp teeth.",
        )
        Cpick = Species(
            name="Chain Pickerel",
            description="A freshwater fish known for its distinctive chain-like markings and aggressive nature.",
        )
        Muskie = Species(
            name="Muskellunge",
            description="A large freshwater fish known for its size and elusive behavior, after refered to as 'Muskie'.",
        )
        species_list = [
            LMbass,
            Rtrout,
            Btrout,
            Brookie,
            Ccarp,
            SMbass,
            Bgill,
            Pseed,
            Crappie,
            Npike,
            Cpick,
            Muskie,
        ]
        db.session.add_all(species_list)
        db.session.commit()

    def create_catches():
        catch1 = Catch(species_id=1, weight=5.2, length=18.0)
        catch2 = Catch(species_id=2, weight=3.5, length=15.0)
        catch3 = Catch(species_id=3, weight=4.0, length=16.5)
        catch4 = Catch(species_id=4, weight=2.8, length=14.0)
        catch5 = Catch(species_id=5, weight=10.0, length=25.0)
        catch6 = Catch(species_id=6, weight=6.1, length=20.0)
        catch7 = Catch(species_id=7, weight=1.5, length=10.0)
        catch8 = Catch(species_id=8, weight=0.9, length=8.0)
        catch9 = Catch(species_id=9, weight=2.3, length=12.0)
        catch10 = Catch(species_id=10, weight=8.4, length=22.0)

        catches_list = [
            catch1,
            catch2,
            catch3,
            catch4,
            catch5,
            catch6,
            catch7,
            catch8,
            catch9,
            catch10,
        ]
        create_fish()
        create_catches()
        db.session.add_all(catches_list)
        db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        print("Seeding database...")
        seed_database()
