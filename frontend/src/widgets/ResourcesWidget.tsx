import { Card } from '../ui/Card';

export function ResourcesWidget() {
  const resources = [
    {
      title: "Memory Management",
      icon: "memory",
      description: "High-performance cache for recent inference results and context windows.",
      open: true
    },
    {
      title: "Vector DB",
      icon: "account_tree",
      description: "Vectorized knowledge base for RAG implementation and long-term storage.",
      open: false
    },
    {
      title: "Containers",
      icon: "box",
      description: "Microservice isolation for agent tools and module sandboxing.",
      open: false
    },
    {
      title: "LLM Cache",
      icon: "bolt",
      description: "Latency reduction through semantic caching of frequent LLM queries.",
      open: false
    }
  ];

  return (
    <Card className="col-span-1 md:col-span-6 lg:col-span-4">
      <h4 className="text-lg font-bold text-charcoal dark:text-white mb-4">Core Infrastructure</h4>
      <div className="space-y-2">
        {resources.map((res, i) => (
          <details key={i} className="group bg-white/40 dark:bg-white/5 rounded-2xl overflow-hidden" open={res.open}>
            <summary className="flex items-center justify-between p-4 cursor-pointer list-none group-open:bg-primary/10">
              <span className="text-sm font-bold text-charcoal dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">{res.icon}</span>
                {res.title}
              </span>
              <span className="material-symbols-outlined text-[18px] group-open:rotate-180 transition-transform">expand_more</span>
            </summary>
            <div className="p-4 text-xs font-medium text-slate-500 dark:text-slate-400 border-t border-primary/5">
              {res.description}
            </div>
          </details>
        ))}
      </div>
    </Card>
  );
}
