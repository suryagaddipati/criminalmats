require 'shopify_api'
require 'nokogiri'
require 'open-uri'
require 'htmlentities'
require 'unicode'
ShopifyAPI::Base.site = "https://44bc1926d4ea65a66bdf204559c62436:9936d683ce4e049df5d67acfb58f3dac@criticalmats-com.myshopify.com/admin/"

def import_products
  # Nokogiri::HTML(open("http://www.andersenco.com/productcategory.aspx")).css(".gridBrowser").css('tr').each do |u| 
  #   url = "http://www.andersenco.com" +u[:onclick].split("'")[1]
  #   import_product(url)
  # end
  
 
   f = File.open("html/1.html")
  Nokogiri::HTML(f).css(".gridBrowser").css('tr').each do |u| 
    url = "http://www.andersenco.com" +u[:onclick].split("'")[1]
    p url
    import_product(url)
  end

end


def import_product(url)
  doc = Nokogiri::HTML(open(url))


  # debugger
  title = extract_title(doc)
  description = extract_description(doc)
  colors = extract_colors(doc)
  sizes = extract_sizes(doc)
  specifications = extract_specifications(doc)
  features = extract_features(doc)
  data = {title:title, description: description, colors: colors, sizes: sizes, specifications: specifications , features: features}
  # ShopifyAPI::Product.create("title" => title ,"body_html"=> body_html,"product_type" => "Entrance Mats Indoor")
 File.open("data/#{title}.yml", 'w') { |file| file.write(data.to_yaml) }
end

def extract_features(doc)
  doc.encoding = 'utf-8'
  doc.css('.prodSpecTable')[1].css('td').to_a.select{|x| !x.text.strip.match(/^Sizes:/) &&  x.text.strip.length > 8 }. map { |x| x.text.strip}
end
def extract_specifications(doc)
  specs = {}
  begin
  sizes_section = doc.css('.prodSpecTable td').each do |td|
    style = td.attr('style')
    spec = ''
    if(style == 'font-weight: bold; text-align: right; text-decoration: underline;')
      spec = td.text.strip
      specs[spec] = {}
    end

    if(style == 'font-weight: bold; text-align: right;')
      specs.values.last[td.text.strip] = td.parent.css('td').last.text.strip
    end
  end
  rescue
    #donothing
  end
  specs
end

def extract_title(doc)
  doc.css('.CaptionThumbnail').children.first.content.split('Mats').first.strip
end

def extract_description(doc)
  doc.css('.main table table td').first.to_html
end

def extract_colors(doc)
  doc.css('.productcolor td').map do |color| 
    color.children.size > 1 ?  color.children[2].text.split('#').first.strip : nil
  end.compact
end
def extract_sizes(doc)
  sizes_section = doc.css('.prodSpecTable td').map(&:text).grep(/Sizes/)
  sizes = []
  unless(sizes_section.empty?)
    size_html = sizes_section.first.split('Sizes:')[1].strip.split('x').map{|x| x.split(' ')}.flatten.each_slice(2)

    coder = HTMLEntities.new
    sizes = size_html.map do |size| 
      length = coder.encode(size.first, :named).split('&acirc;').first
      breath = coder.encode(size[1], :named).split('&acirc;').first
      "#{length} x #{breath}"
    end
  end
  return sizes
end


# import_product('http://www.andersenco.com/ProductPages/EntranceMatsIndoor/WaterHogClassic.aspx')
# import_product('http://www.andersenco.com/ProductPages/EntranceMatsIndoor/BrushHogPlus.aspx')
import_products


