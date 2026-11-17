export type RouteInfo = { id:string; name:string; distance:number; wallMeters:number; activeFronts:number; lighting:'Boa'|'Parcial'|'Pouca informação'; description:string; features:string[] };
// Dados fictícios, sem associação a endereços reais.
export const routes:RouteInfo[] = [
{id:'a',name:'Caminho A',distance:620,wallMeters:370,activeFronts:2,lighting:'Parcial',description:'Mais curto, mas com longos trechos de muros contínuos.',features:['Trecho longo de muro','Poucas fachadas ativas','Menor distância']},
{id:'b',name:'Caminho B',distance:790,wallMeters:90,activeFronts:11,lighting:'Boa',description:'Um pouco mais longo, com mais entradas e atividades voltadas à rua.',features:['Mais fachadas ativas','Menos muros contínuos','Iluminação registrada']},
{id:'c',name:'Caminho C',distance:710,wallMeters:210,activeFronts:6,lighting:'Pouca informação',description:'Opção intermediária com dados de iluminação ainda incompletos.',features:['Distância intermediária','Dados incompletos']}
];
