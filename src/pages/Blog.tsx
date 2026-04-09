import { blogPosts } from "@/data/products";
import { Clock, ArrowRight } from "lucide-react";

const Blog = () => (
  <div className="section-padding">
    <div className="container">
      <h1 className="font-display text-4xl md:text-5xl mb-2">¿SABÍAS QUE?</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Consejos, guías y tutoriales para sacar el máximo provecho de tus herramientas y materiales.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <article key={post.id} className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all">
            <div className="aspect-video bg-muted overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">{post.category}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{post.excerpt}</p>
              <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Leer más <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  </div>
);

export default Blog;
