export async function getProductFromId(supabase: Supabase, product: string) {
  const { data: productData, error } = await supabase
    .from('products')
    .select()
    .eq('id', product)
    .single()
  if (error) throw error
  return productData
}
