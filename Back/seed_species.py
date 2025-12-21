from app import app, db
from models import Species


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


def seed_database():
    db.drop_all()
    db.create_all()
    create_fish()
    db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        print("Seeding database...")
        seed_database()
