interface Props {
  data?: string;
}

const StructureData = ({ data }: Props) => {
  if (!data) return null;

  // Se já for um script completo, injeta direto
  if (data.includes("<script")) {
    return <div dangerouslySetInnerHTML={{ __html: data }} />;
  }

  // Se for JSON puro, tenta parsear e injetar
  try {
    const jsonData = JSON.parse(data);
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonData) }} />;
  } catch (error) {
    console.error("Erro ao parsear JSON em StructureData:", error);
    return null;
  }
};

export default StructureData;
