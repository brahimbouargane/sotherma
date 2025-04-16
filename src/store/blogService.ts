// src/services/blogService.ts

export interface BlogPostOne {
  id: number;
  postId: string; // This can be used for routing
  title: string;
  tags?: string[];
  slug: string;
  category: string;
  publishDate: string;
  mainImage: string;
  introduction: {
    title: string;
    content: string;
  };
  sections?: Array<{
    type?: string;
    title?: string;
    paragraphs?: string[];
    image?: string;
    caption?: string;
  }>;
  conclusion?: {
    title: string;
    content: string;
  };
  author: {
    name: string;
    image: string;
    bio: string;
  };
  socialSharing: {
    text: string;
    platforms: string[];
  };
  relatedPosts: Array<{
    id: number;
    postId: string; // For linking to related posts
    title: string;
    slug: string;
  }>;
}

// Mock blog posts data
const blogPosts: BlogPostOne[] = [
  {
    id: 1,
    postId: "le-titre-de-larticle",
    title: "Le titre de l'article",
    slug: "le-titre-de-larticle",
    tags: ["Health", "Water", "Nutrition", "Wellness"],
    category: "category",
    publishDate: "12 Avril 2025",
    mainImage:
      "https://images.unsplash.com/photo-1629392245225-feb3f7635e52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    introduction: {
      title: "Introduction",
      content:
        "Le corps humain est composé d'environ 60% d'eau, tandis que notre cerveau contient environ 75% d'eau. L'eau est essentielle à notre survie et à notre bien-être. Elle aide à réguler la température corporelle, transporte les nutriments et l'oxygène vers nos cellules, élimine les déchets et protège nos articulations et tissus. En moyenne, un adulte a besoin de consommer environ 2 litres d'eau par jour pour maintenir une bonne hydratation. Cette quantité peut varier en fonction de facteurs tels que l'âge, le sexe, le niveau d'activité physique, la température ambiante et l'état de santé général.",
    },
    sections: [
      {
        type: "introduction",
        title: "Introduction",
        paragraphs: [
          "In posuper vel, scelerisque leo et, dolor amet, nec lorem scelerisque viverra adipiscing hendrerit. Neque nisi velit morbi mattis cras volutpat urna nulla arcu nec, nibh massa urna velit, vitae sed, urna luctus. Et magna sapien vestibuli.",
          "Eget quam ipsum, ele eleifend blandit in, integer quam in dignit mus at dui eget amet, velit mauris. Vitae vestibulum dui morbi erat. Sit amet duis tellus blandit. In iaculis vestibulum atre porttitor mauris. Vivamus nec pretium hendrerit, enim et venenatis libero erat in commodo sit eur.",
        ],
        image:
          "https://images.unsplash.com/photo-1594745672419-1caafdc11087?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        caption: "En image, un verre d'eau.",
      },
      {
        type: "content",
        paragraphs: [
          "Dolor aritus am tortor urna sed duis mollis. Aliquam vestibulum, nulla esto commodo metus, tellus est quam nisl, posuere. Nune lorem ultrices sit scelerisque bibendum diam. Tempor feugiat adipiscing in vitae malesuada fringilla.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et malesuada libero, id pharetra nibh. Phasellus ultrices bibendum quam, non interdum leo lobortis vel. Suspendisse nec lacus volutpat felis, volutpat venenatis posuere scelerisque convallis integer. Aenean ullamcorper nisi at lacus consectetur lobortis. Integer lacinia metus in arcu porta, a consectetur lorem nisi eleifend. Nulla lacus velit massa, pharetra justo.",
          "Vivam sit mentia nulls quam nulla. Gravida id posuida ex carin donario ut fasis consequatque sit quam aipid condimentum magna. Sapien, ultrices incentos quis accidentali, in varius hac. Donec consectetur sed a ut nulla.",
          "Vivamus nulla dolor lacus, non volutpat cursus vel massa, volutpat facilisi. Auet nec volutpat cursus massa laoret consequat, sapien id sollicitudin turpis. Duis sed sapien quis magna tincidunt condimentum in libero sagittis. Curabitur rhoncus eget urna ac pulvinar. Vivamus leo velit massa posuere pede.",
        ],
      },
      {
        type: "conclusion",
        title: "Conclusion",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et malesuada libero, id pharetra nibh. Phasellus ultrices bibendum quam, non interdum leo lobortis vel. Suspendisse nec lacus volutpat felis, volutpat venenatis posuere scelerisque convallis integer.",
          "Aenean nec felis ullamcorper feugiat quam ullamcorper. Lorem sagittis condimentum lorem in massa. In condimentum commodo amet risus ac libero iaculis. Morbi dignissim in ante sapien. Duis hendrerit nunc.",
          "Cras nec magna massa magna velit cras magna nulla aliquet. Nam semper et urna ut enim ut aliquam consectetur sed libero. Lorem ipsum et massas sapien et viverre. Molesstias massa mauris aliquet massa scelerisque ane. Amet condimentum posuere proin porta non curabitur cum aliq.",
        ],
      },
    ],
    conclusion: {
      title: "Conclusion",
      content:
        "Nous vous rappelons qu'il existe différentes façons de boire de l'eau, mais ce consommer est l'étape primordial pour votre bien-être, votre santé et votre quotidien, et n'oubliez pas de vous hydratez au moins deux litres d'eau par jour.",
    },
    author: {
      name: "Mona Elsa",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
      bio: "Nutritionniste spécialisée dans l'hydratation et la santé globale. Consultante pour plusieurs marques d'eau et de boissons fonctionnelles.",
    },
    socialSharing: {
      text: "Share this post",
      platforms: ["Facebook", "Twitter", "Pinterest", "Email"],
    },
    relatedPosts: [
      {
        id: 2,
        postId: "bienfaits-eaux-minerales",
        title: "Les bienfaits des eaux minérales",
        slug: "bienfaits-eaux-minerales",
      },
      {
        id: 3,
        postId: "eau-sport-hydratation-efficace",
        title: "Eau et sport : comment s'hydrater efficacement",
        slug: "eau-sport-hydratation-efficace",
      },
      {
        id: 4,
        postId: "eau-alimentation-quotidienne",
        title: "L'eau dans notre alimentation quotidienne",
        slug: "eau-alimentation-quotidienne",
      },
    ],
  },
  {
    id: 2,
    postId: "bienfaits-eaux-minerales",
    title: "Les bienfaits des eaux minérales",
    slug: "bienfaits-eaux-minerales",
    category: "Santé",
    publishDate: "5 Avril 2025",
    tags: ["Health", "Water", "Nutrition", "Wellness"],
    mainImage:
      "https://images.unsplash.com/photo-1564419320461-6870880221ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    introduction: {
      title: "Introduction",
      content:
        "L'eau minérale naturelle provient de sources souterraines protégées de toute pollution. Elle est caractérisée par sa pureté et sa composition en minéraux et oligo-éléments qui lui confèrent des propriétés bénéfiques pour la santé. Contrairement à l'eau du robinet, l'eau minérale n'est pas traitée chimiquement et conserve ainsi ses qualités originelles.",
    },

    sections: [
      {
        type: "introduction",
        title: "Introduction",
        paragraphs: [
          "In posuper vel, scelerisque leo et, dolor amet, nec lorem scelerisque viverra adipiscing hendrerit. Neque nisi velit morbi mattis cras volutpat urna nulla arcu nec, nibh massa urna velit, vitae sed, urna luctus. Et magna sapien vestibuli.",
          "Eget quam ipsum, ele eleifend blandit in, integer quam in dignit mus at dui eget amet, velit mauris. Vitae vestibulum dui morbi erat. Sit amet duis tellus blandit. In iaculis vestibulum atre porttitor mauris. Vivamus nec pretium hendrerit, enim et venenatis libero erat in commodo sit eur.",
        ],
        image:
          "https://images.unsplash.com/photo-1594745672419-1caafdc11087?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        caption: "En image, un verre d'eau.",
      },
      {
        type: "content",
        paragraphs: [
          "Dolor aritus am tortor urna sed duis mollis. Aliquam vestibulum, nulla esto commodo metus, tellus est quam nisl, posuere. Nune lorem ultrices sit scelerisque bibendum diam. Tempor feugiat adipiscing in vitae malesuada fringilla.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et malesuada libero, id pharetra nibh. Phasellus ultrices bibendum quam, non interdum leo lobortis vel. Suspendisse nec lacus volutpat felis, volutpat venenatis posuere scelerisque convallis integer. Aenean ullamcorper nisi at lacus consectetur lobortis. Integer lacinia metus in arcu porta, a consectetur lorem nisi eleifend. Nulla lacus velit massa, pharetra justo.",
          "Vivam sit mentia nulls quam nulla. Gravida id posuida ex carin donario ut fasis consequatque sit quam aipid condimentum magna. Sapien, ultrices incentos quis accidentali, in varius hac. Donec consectetur sed a ut nulla.",
          "Vivamus nulla dolor lacus, non volutpat cursus vel massa, volutpat facilisi. Auet nec volutpat cursus massa laoret consequat, sapien id sollicitudin turpis. Duis sed sapien quis magna tincidunt condimentum in libero sagittis. Curabitur rhoncus eget urna ac pulvinar. Vivamus leo velit massa posuere pede.",
        ],
      },
      {
        type: "conclusion",
        title: "Conclusion",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et malesuada libero, id pharetra nibh. Phasellus ultrices bibendum quam, non interdum leo lobortis vel. Suspendisse nec lacus volutpat felis, volutpat venenatis posuere scelerisque convallis integer.",
          "Aenean nec felis ullamcorper feugiat quam ullamcorper. Lorem sagittis condimentum lorem in massa. In condimentum commodo amet risus ac libero iaculis. Morbi dignissim in ante sapien. Duis hendrerit nunc.",
          "Cras nec magna massa magna velit cras magna nulla aliquet. Nam semper et urna ut enim ut aliquam consectetur sed libero. Lorem ipsum et massas sapien et viverre. Molesstias massa mauris aliquet massa scelerisque ane. Amet condimentum posuere proin porta non curabitur cum aliq.",
        ],
      },
    ],
    // conclusion: {
    //   title: "Conclusion",
    //   content:
    //     "Choisir une eau minérale adaptée à ses besoins est une démarche qui peut contribuer à une meilleure santé au quotidien. Néanmoins, il est important de varier les sources d'eau minérale pour bénéficier d'apports équilibrés en minéraux et de consulter un professionnel de santé pour toute cure spécifique.",
    // },
    author: {
      name: "Dr. Pierre Fontaine",
      image: "https://randomuser.me/api/portraits/men/42.jpg",
      bio: "Médecin nutritionniste spécialisé dans l'hydratation et l'équilibre minéral. Auteur de plusieurs ouvrages sur les bienfaits de l'eau.",
    },
    socialSharing: {
      text: "Share this post",
      platforms: ["Facebook", "Twitter", "Pinterest", "Email"],
    },
    relatedPosts: [
      {
        id: 1,
        postId: "le-titre-de-larticle",
        title: "Le titre de l'article",
        slug: "le-titre-de-larticle",
      },
      {
        id: 3,
        postId: "eau-sport-hydratation-efficace",
        title: "Eau et sport : comment s'hydrater efficacement",
        slug: "eau-sport-hydratation-efficace",
      },
      {
        id: 5,
        postId: "importance-qualite-eau",
        title: "L'importance de la qualité de l'eau",
        slug: "importance-qualite-eau",
      },
    ],
  },
  // You can add more blog posts here
];

// Service functions
export const getBlogPosts = (): Promise<BlogPostOne[]> => {
  return Promise.resolve(blogPosts);
};

// Function to get a blog post by ID or slug
export const getBlogPostBySlug = (
  postId: string
): Promise<BlogPostOne | undefined> => {
  const post = blogPosts.find(
    (post) =>
      post.postId === postId ||
      post.slug === postId ||
      post.id.toString() === postId
  );
  return Promise.resolve(post);
};

export const getBlogPostsByCategory = (
  category: string
): Promise<BlogPostOne[]> => {
  const posts = blogPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
  return Promise.resolve(posts);
};

export const getRelatedPosts = (postId: number): Promise<BlogPostOne[]> => {
  const currentPost = blogPosts.find((post) => post.id === postId);
  if (!currentPost) return Promise.resolve([]);

  const relatedPostIds = currentPost.relatedPosts.map((post) => post.id);
  const posts = blogPosts.filter((post) => relatedPostIds.includes(post.id));

  return Promise.resolve(posts);
};
