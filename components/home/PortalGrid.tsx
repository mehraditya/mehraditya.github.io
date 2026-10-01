import Portal from "@/components/editorial/Portal";

export default function PortalGrid() {
  return (
    <div className="portals">
      <Portal
        href="/research-notes"
        label="Research Notes"
        description="papers · experiments · ideas"
      />
      <Portal
        href="/writings"
        label="Writings"
        description="essays · synthesis · observations"
      />
    </div>
  );
}
