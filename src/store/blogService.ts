// src/services/blogService.ts

export interface BlogPostOne {
  id: number;
  postId: string; // This can be used for routing
  title: string;
  slug: string;
  category: string;
  publishDate: string;
  mainImage: string;
  introduction: {
    title: string;
    content: string;
  };
  sections: Array<{
    title?: string;
    content: string;
    image?: string;
    caption?: string;
  }>;
  conclusion: {
    title: string;
    content: string;
  };
  author: {
    name: string;
    image: string;
    bio: string;
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
        title: "",
        content:
          "Boire une quantité suffisante d'eau chaque jour peut aider à prévenir les maux de tête, améliorer la concentration et l'humeur, et favoriser un sommeil réparateur. Quand nous ne buvons pas assez d'eau, nous risquons de souffrir de déshydratation, ce qui peut entraîner des symptômes comme la fatigue, des étourdissements et des crampes musculaires.",
        image:
          "https://images.unsplash.com/photo-1594745672419-1caafdc11087?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        caption: "En image, un verre d'eau.",
      },
      {
        title: "Boire assez est bonne chose pour votre santé.",
        content:
          "Aliquam vestibulum, nulla odio nisl vitae, id dignissim lorem odiam. Ornare an a euismod dignissim lorem. Aliquam vestibulum, nulla odio nisl vitae, id dignissim lorem odiam. Ornare an a euismod dignissim lorem. Nam et lobortis tellus. Etiam ac enim cursus, scelerisque ex ut, lobortis tortor. Aenean et magna sit amet urna vestibulum tristique. Maecenas vitae dignissim risus, ac porttitor diam. Morbi viverra orci at malesuada ultricies. Donec porttitor ipsum non tortor consequat convallis.",
      },
      {
        title: "",
        content:
          "Il existe différentes sources d'eau potable, comme l'eau du robinet, l'eau en bouteille et l'eau filtrée. Chacune a ses avantages et ses inconvénients. L'eau du robinet est généralement sûre à boire dans de nombreux pays et est plus économique et écologique que l'eau en bouteille. L'eau en bouteille peut être plus pratique lorsque vous êtes en déplacement, mais elle génère des déchets plastiques qui nuisent à l'environnement. L'eau filtrée peut offrir un compromis entre les deux, en réduisant les contaminants potentiels de l'eau du robinet tout en limitant les déchets plastiques produits.",
      },
      {
        title: "",
        content:
          "Pour rester bien hydraté tout au long de la journée, essayez de garder une bouteille d'eau réutilisable à portée de main. Buvez avant, pendant et après l'exercice physique. Mangez des aliments riches en eau, comme les concombres, les pastèques et les oranges. Créez des rappels pour boire régulièrement, surtout si vous avez tendance à oublier. Et n'attendez pas d'avoir soif pour boire, car la soif est déjà un signe de déshydratation.",
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
    mainImage:
      "https://images.unsplash.com/photo-1564419320461-6870880221ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    introduction: {
      title: "Introduction",
      content:
        "L'eau minérale naturelle provient de sources souterraines protégées de toute pollution. Elle est caractérisée par sa pureté et sa composition en minéraux et oligo-éléments qui lui confèrent des propriétés bénéfiques pour la santé. Contrairement à l'eau du robinet, l'eau minérale n'est pas traitée chimiquement et conserve ainsi ses qualités originelles.",
    },
    sections: [
      {
        title: "Les différents types d'eaux minérales",
        content:
          "Il existe plusieurs catégories d'eaux minérales, chacune ayant ses caractéristiques propres. Les eaux faiblement minéralisées, comme l'eau de source, conviennent à la consommation quotidienne et à la préparation des biberons. Les eaux moyennement minéralisées apportent un complément intéressant en calcium et en magnésium. Les eaux fortement minéralisées, quant à elles, sont recommandées pour des cures spécifiques et ne doivent pas être consommées en permanence.",
        image:
          "https://images.unsplash.com/photo-1610013762141-0fc363086e35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        caption: "Différentes bouteilles d'eau minérale.",
      },
      {
        title: "Les minéraux essentiels et leurs bienfaits",
        content:
          "Les eaux minérales sont riches en éléments bénéfiques pour notre organisme. Le calcium, présent dans certaines eaux, contribue à la solidité des os et au bon fonctionnement musculaire. Le magnésium aide à lutter contre la fatigue et le stress. Le potassium participe à l'équilibre hydrique et au bon fonctionnement du système nerveux. Le bicarbonate facilite la digestion et neutralise l'acidité gastrique.",
      },
    ],
    conclusion: {
      title: "Conclusion",
      content:
        "Choisir une eau minérale adaptée à ses besoins est une démarche qui peut contribuer à une meilleure santé au quotidien. Néanmoins, il est important de varier les sources d'eau minérale pour bénéficier d'apports équilibrés en minéraux et de consulter un professionnel de santé pour toute cure spécifique.",
    },
    author: {
      name: "Dr. Pierre Fontaine",
      image: "https://randomuser.me/api/portraits/men/42.jpg",
      bio: "Médecin nutritionniste spécialisé dans l'hydratation et l'équilibre minéral. Auteur de plusieurs ouvrages sur les bienfaits de l'eau.",
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
