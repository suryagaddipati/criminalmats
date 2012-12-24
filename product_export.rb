require 'shopify_api'
require 'nokogiri'
require 'open-uri'
require 'htmlentities'
require 'unicode'

# ShopifyAPI::Base.site = "https://44bc1926d4ea65a66bdf204559c62436:9936d683ce4e049df5d67acfb58f3dac@criticalmats-com.myshopify.com/admin/"
ShopifyAPI::Base.site = "https://2fc826b80977d5ca903b3456c6d06ef5:e82f83956addbb14cfd4ee2c3799cc4c@mitchell-llc4921.myshopify.com/admin/"
def export_to_shopify(dir, vendor)
  delete_all_products(vendor)
  Dir["#{dir}/*.yml"].each do |product_yml|
  # Dir['data/WaterHog Masterpiece.yml'].each do |product_yml|
    p product_yml
    product_data =  YAML.load_file(product_yml)
    shopify_data = to_shopify_data(product_data)
    # debugger
    res = ShopifyAPI::Product.create(shopify_data)
    
    product_data["id"]  = res.id
 File.open(product_yml, 'w') { |file| file.write(product_data.to_yaml) }
     if(res.errors.count > 0)
       # debugger
       p product_yml
       p res.errors.full_messages
     end
  end
end

def to_shopify_data(p)
  data = {}
  if(p[:vendor])
    data[:vendor] = p[:vendor]
  else
  data[:vendor] = 'The Andersen Co.'
  end
  data[:body_html] = p[:description]  + features_html(p[:features])
  data[:product_type] = p[:product_type]
  data[:title] = p[:title]
  data[:options] = [{name: "Color",position: 1} , {name: "Size",position: 2}]
  variants = p[:colors].inject([]) do |out,color| 
    # p p[:sizes]
     vars = p[:sizes].map{|size_price| create_variant(color,size_price.keys.first,size_price.values.first)}
    out << vars 
    out
  end
  data [:variants] = variants.flatten[0...100]

  data
end

def features_html(features)
  return "" if features.nil?
  out = "<b>Features</b> <ul>"
  features. each {|feature| 
    out = out + "<li> #{feature} </li>"
  }
  out = out + "</ul>"
  out
end


def create_variant(color,size,price_weight)
  price = price_weight.split(',')[0].to_f
  grams = price_weight.split(',')[1].to_f * 453.592
  {
    option1: color,
    option2: size,
    price: price,
    grams: grams
  }
end

def delete_all_products(vendor)
  ShopifyAPI::Product.all.each do |product| 
    ShopifyAPI::Product.delete(product.id) unless product.id == 110665327
  end
end

def export_image(product,image)
  begin
    product.post(:images,{}, {:image => {:src => image }}.to_json)
  rescue
    p "Image not found #{image}"
  end
end

def export_images(dir)
  Dir["#{dir}/*.yml"].each do |product_yml|
    product_data =  YAML.load_file(product_yml)
    product = ShopifyAPI::Product.find(product_data["id"])
    product.images.each {|img| product.delete("images/#{img.id}")}
    # product.images.each {|id| p id;product.delete(:images, id.id.to_s)}
   begin 
    product_data[:images].each do |image|
      export_image(product,image)
      # export_image(product,image.gsub('lores','hires'))
    end
   rescue
     p product_yml
   end
  end
end

# export_to_shopify('testdata','')
export_images('testdata')
